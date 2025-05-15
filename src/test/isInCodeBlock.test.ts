import * as assert from "assert";
import { isInCodeBlock } from "../isInCodeBlock.js";

// TODO: test with gfm and inline code block
const commonMarkDocument = `First line
Line before block

    const t = 1;
    console.log("Hello, world!");
    return;

Line after block
Last line
`;

suite("It is in the code block if", () => {
  test("it is at the top of it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 4), true);
  });
  test("it is at the bottom of it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 6), true);
  });
  test("it is in the middle of it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 5), true);
  });
});

suite("It is not in the code block if", () => {
  test("it is above it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 1), false);
  });
  test("it is a line above it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 3), false);
  });
  test("it is below it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 9), false);
  });
  test("it is a line below it", () => {
    assert.strictEqual(isInCodeBlock(commonMarkDocument, 7), false);
  });
});
