import { fromMarkdown } from "mdast-util-from-markdown";
import { find } from "unist-util-find";

/**
 * @param document a Markdown document
 * @param line a line number in the Markdown document
 * @returns whether `line` is a code block in `document`.
 */
export function isInCodeBlock(document: string, line: number): boolean {
  // Transforming the document every time to an AST could become expensive.
  // We should refactor this if `isInCodeBlock` is used often.
  // See https://github.com/md-babel/vscode-md-babel/issues/22.
  const tree = fromMarkdown(document);

  const node = find(tree, (node) => {
    if (node.position == undefined) {
      return false;
    }

    return (
      node.type === "code" &&
      node.position.start.line <= line &&
      node.position.end.line >= line
    );
  });

  return node != undefined;
}
