import * as vscode from 'vscode';
import { execSync } from 'child_process';

/// 1-based line and column indices (conforming to cmark).
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
  let disposable = vscode.commands.registerCommand('vscode-md-babel.executeBlockAtPoint', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor!');
      return;
    }

    if (editor.document.languageId !== 'markdown') {
      vscode.window.showErrorMessage('Not a Markdown file!');
      return;
    }

    const config = vscode.workspace.getConfiguration('mdBabel');
    const mdBabelPath = config.get<string>('executablePath');

    if (!mdBabelPath) {
      vscode.window.showErrorMessage('md-babel executable path not set. Please configure mdBabel.executablePath');
      return;
    }

    try {
      const position = editor.selection.active;
      const location = getSourceLocation(position);
      const response = await executeMdBabel(mdBabelPath, location, editor.document.getText());

      await applyResponse(editor, response);
    } catch (error) {
      vscode.window.showErrorMessage(`Error executing md-babel: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}

/// Convert position to 1-based line and column.
function getSourceLocation(position: vscode.Position): SourceLocation {
  return {
    line: position.line + 1,
    column: position.character + 1
  };
}

function executeMdBabel(mdBabelPath: string, location: SourceLocation, documentText: string): Promise<MdBabelResponse> {
  return new Promise((resolve, reject) => {
    try {
      const command = `${mdBabelPath} exec --line ${location.line} --column ${location.column}`;
      const output = execSync(command, {
        input: documentText,
        encoding: 'utf-8'
      });

      const response = JSON.parse(output) as MdBabelResponse;
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function applyResponse(editor: vscode.TextEditor, response: MdBabelResponse): Promise<void> {
  // 1) Apply replacementString at replacementRange in the editor.
  const replaceFrom = new vscode.Position(
    response.replacementRange.from.line - 1,
    response.replacementRange.from.column - 1
  );
  const replaceTo = new vscode.Position(
    response.replacementRange.to.line - 1,
    response.replacementRange.to.column - 1
  );
  const replacementRange = new vscode.Range(replaceFrom, replaceTo);

  await editor.edit(editBuilder => {
    editBuilder.replace(replacementRange, response.replacementString);
  });

  // 2) Set selection to the range indicated in the response (should be the original location).
  const selectFrom = new vscode.Position(
    response.range.from.line - 1,
    response.range.from.column - 1
  );
  const selectTo = new vscode.Position(
    response.range.to.line - 1,
    response.range.to.column - 1
  );
  editor.selection = new vscode.Selection(selectFrom, selectTo);
}

export function deactivate() {}
