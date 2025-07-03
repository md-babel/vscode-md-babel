import * as vscode from "vscode";

export function isMdBabelInPath(
  mdBabelPath: string | null,
): mdBabelPath is string {
  if (mdBabelPath === null) {
    const releasePage = "Release Page";
    vscode.window
      .showErrorMessage(
        `md-babel was not found. Please add md-babel to the path environment
               variable ($PATH) or configure mdBabel.executablePath.
               You can download md-babel from the release page.`,
        releasePage,
      )
      .then((selection) => {
        if (selection === releasePage) {
          vscode.env.openExternal(
            vscode.Uri.parse(
              "https://github.com/md-babel/swift-markdown-babel/releases/latest",
            ),
          );
        }
      });
    return false;
  }

  return true;
}
