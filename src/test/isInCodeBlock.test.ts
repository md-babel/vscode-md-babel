import * as assert from "assert";
import { isInCodeBlock } from "../isInCodeBlock.js";

// TODO: test with gfm
const document = `First line
Line above block
\`\`\`js
console.log("Hello, world!");
\`\`\`
Line below block

~~~sh
date
echo ""
~~~

Last line
`;

suite("It is in the code block", () => {
  suite("created by backticks if", () => {
    test("it is at the top of it", () => {
      assert.strictEqual(isInCodeBlock(document, 3), true);
    });
    test("it is at the bottom of it", () => {
      assert.strictEqual(isInCodeBlock(document, 5), true);
    });
    test("it is in the middle of it", () => {
      assert.strictEqual(isInCodeBlock(document, 4), true);
    });
  });

  test("created by tildes", () => {
    assert.strictEqual(isInCodeBlock(document, 9), true);
  });
});

suite("It is not in the code block if", () => {
  test("it is above it", () => {
    assert.strictEqual(isInCodeBlock(document, 1), false);
  });
  test("it is a line above it", () => {
    assert.strictEqual(isInCodeBlock(document, 2), false);
  });
  test("it is below it", () => {
    assert.strictEqual(isInCodeBlock(document, 13), false);
  });
  test("it is a line below it", () => {
    assert.strictEqual(isInCodeBlock(document, 6), false);
  });
});
