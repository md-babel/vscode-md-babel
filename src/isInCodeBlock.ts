import { fromMarkdown } from "mdast-util-from-markdown";
import { find } from "unist-util-find";

export function isInCodeBlock(document: string, position: number): boolean {
  const tree = fromMarkdown(document);

  const node = find(tree, (node) => {
    console.log(node.position);

    if (node.position == undefined) {
      return false;
    }
    return (
      node.type !== "code" &&
      node.position.start.line <= position &&
      node.position.end.line >= position
    );
  });

  return node != undefined;
}
