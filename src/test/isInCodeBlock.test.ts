import * as assert from "assert";
import { isInCodeBlock } from "../isInCodeBlock.js";

const document = `First line
    Line before block
    \`\`\`js
    console.log("Hello, world!");
    \`\`\`
    Line after block
    Last line
    `;

suite("It is in the code block if", () => {
  test("it is at the top of it", () => {
    assert.strictEqual(isInCodeBlock(document, 3), true);
  });
  test("it is at the bottom of it", () => {
    assert.strictEqual(isInCodeBlock(document, 5), true);
  });
  test("it is in the middle of it", () => {
    assert.strictEqual(isInCodeBlock(document, 4), true);
  });
  suite("the document consists of a code block", () => {});
});

suite("It is not in the code block if", () => {
  test("it is above it", () => {
    assert.strictEqual(isInCodeBlock(document, 0), false);
  });
  test("it is a line above it", () => {
    assert.strictEqual(isInCodeBlock(document, 2), false);
  });
  test("it is below it", () => {
    assert.strictEqual(isInCodeBlock(document, 7), false);
  });
  test("it is a line below it", () => {
    assert.strictEqual(isInCodeBlock(document, 6), false);
  });
  suite("the document does not contain a code block", () => {});
});
