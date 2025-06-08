import * as vscode from "vscode";
import { type } from "node:os";

/**
 * md-babel currently runs only on macOS and Linux.
 * @returns whether md-babel runs on the current operating
 * system
 */
export function isOSSupported(): boolean {
  return ["Linux", "Darwin"].includes(type());
}

/**
 * If the extension is activated for the first time and the
 * OS is not supported by md-babel, that is it is not Linux
 * or macOS, an error message is shown. To avoid showing the
 * error message each time, it is stored in the global state
 * that the extension was already activated.
 *
 * Otherwise, nothing happens.
 *
 * @param context the context of the extension
 */
export async function handleNotSupportedOS(
  context: vscode.ExtensionContext,
): Promise<void> {
  const alreadyActivated = "alreadyActivated";

  if (context.globalState.get<boolean>(alreadyActivated)) {
    return;
  }

  vscode.window.showErrorMessage(
    "md-babel is currently only supported on Linux and macOS.",
  );
  await context.globalState.update(alreadyActivated, true);
}
