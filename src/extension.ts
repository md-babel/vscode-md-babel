import * as vscode from "vscode";
import * as path from "path";
import { execFileSync } from "child_process";

/** 1-based line and column indices (conforming to cmark). */
interface SourceLocation {
  line: number;
  column: number;
}

interface SourceRange {
  from: SourceLocation;
  to: SourceLocation;
}

interface MdBabelResponse {
  replacementRange: SourceRange;
  replacementString: string;
  range: SourceRange;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vscode-md-babel.executeBlockAtPoint",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor!");
        return;
      }

      if (editor.document.languageId !== "markdown") {
        vscode.window.showErrorMessage("Not a Markdown file!");
        return;
      }

      const config = vscode.workspace.getConfiguration("mdBabel");
      const mdBabelPath = config.get<string>("executablePath");

      if (!mdBabelPath) {
        vscode.window.showErrorMessage(
          "md-babel executable path not set. Please configure mdBabel.executablePath",
        );
        return;
      }

      try {
        const position = editor.selection.active;
        const location = getSourceLocation(position);

        let workingDir: string;
        let filename: string | undefined;
        if (editor.document.uri.scheme === "file") {
          const fsPath = editor.document.uri.fsPath;
          const fileDir = path.dirname(fsPath);
          const workspaceFolder = vscode.workspace.getWorkspaceFolder(
            editor.document.uri,
          );
          workingDir = workspaceFolder ? workspaceFolder.uri.fsPath : fileDir;
          filename = path.basename(fsPath, path.extname(fsPath));
        } else {
          workingDir = process.cwd();
          filename = undefined;
        }

        const response = await executeCodeBlock(
          mdBabelPath,
          workingDir,
          filename,
          location,
          editor.document.getText(),
        );

        await applyResponse(editor, response);
      } catch (error) {
        vscode.window.showErrorMessage(`Error executing md-babel: ${error}`);
      }
    },
  );

  context.subscriptions.push(disposable);
}

/** Convert position to 1-based line and column.*/
export function getSourceLocation(position: vscode.Position): SourceLocation {
  return {
    line: position.line + 1,
    column: position.character + 1,
  };
}

/** Convert 1-based line and column location to VSCode Position .*/
export function getPosition(sourceLocation: SourceLocation): vscode.Position {
  return new vscode.Position(
    sourceLocation.line - 1,
    sourceLocation.column - 1,
  );
}

/** Convert 1-based line and column source location range to VSCode Range.*/
export function getRange(range: SourceRange): vscode.Range {
  return new vscode.Range(getPosition(range.from), getPosition(range.to));
}

/** Convert 1-based line and column source location range to VSCode Selection.*/
export function getSelection(range: SourceRange): vscode.Selection {
  return new vscode.Selection(getPosition(range.from), getPosition(range.to));
}

function executeCodeBlock(
  mdBabelPath: string,
  workingDir: string,
  filename: string | undefined,
  location: SourceLocation,
  documentText: string,
): Promise<MdBabelResponse> {
  return new Promise((resolve, reject) => {
    try {
      let args = [
        "exec",
        "--dir",
        workingDir,
        "--line",
        `${location.line}`,
        "--column",
        `${location.column}`,
      ];

      if (filename !== undefined) {
        args.push("--filename", filename);
      }

      const output = execFileSync(mdBabelPath, args, {
        input: documentText,
        encoding: "utf-8",
        cwd: workingDir,
      });
      const response = JSON.parse(output) as MdBabelResponse;
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function applyResponse(
  editor: vscode.TextEditor,
  response: MdBabelResponse,
): Promise<void> {
  // 1) Apply replacementString at replacementRange in the editor.
  const replacementRange = getRange(response.replacementRange);
  await editor.edit((editBuilder) => {
    editBuilder.replace(replacementRange, response.replacementString);
  });

  // 2) Set selection to the range indicated in the response (should be the original location).
  editor.selection = getSelection(response.range);
}

export function deactivate() {}
