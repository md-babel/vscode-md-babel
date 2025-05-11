import * as assert from "assert";
import * as vscode from "vscode";
import * as mdBabel from "../extension";

suite("Position Conversion Functions", () => {
  test("getSourceLocation should convert VSCode position to 1-based locations", () => {
    const position = new vscode.Position(5, 10);
    const location = mdBabel.getSourceLocation(position);

    assert.strictEqual(location.line, 6);
    assert.strictEqual(location.column, 11);
  });

  test("getPosition should convert 1-based location to VSCode position", () => {
    const location = { line: 7, column: 12 };
    const position = mdBabel.getPosition(location);

    assert.strictEqual(position.line, 6);
    assert.strictEqual(position.character, 11);
  });

  test("getRange should convert source range to VSCode range", () => {
    const sourceRange = {
      from: { line: 3, column: 5 },
      to: { line: 4, column: 10 },
    };
    const range = mdBabel.getRange(sourceRange);

    assert.strictEqual(range.start.line, 2);
    assert.strictEqual(range.start.character, 4);
    assert.strictEqual(range.end.line, 3);
    assert.strictEqual(range.end.character, 9);
  });

  test("getSelection should convert source range to VSCode selection", () => {
    const sourceRange = {
      from: { line: 5, column: 8 },
      to: { line: 6, column: 15 },
    };
    const selection = mdBabel.getSelection(sourceRange);

    assert.strictEqual(selection.anchor.line, 4);
    assert.strictEqual(selection.anchor.character, 7);
    assert.strictEqual(selection.active.line, 5);
    assert.strictEqual(selection.active.character, 14);
  });
});
