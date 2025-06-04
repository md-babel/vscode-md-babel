export interface Configuration {
  evaluators: {
    codeBlock: Record<string, CodeBlock>;
  };
}

interface CodeBlock {
  path: string;
  defaultArguments: string[];
  result: Result;
}

type Result = "codeBlock" | ImageResult;

interface ImageResult {
  type: "image";
  extension: string;
  directory: string;
  filename: string;
}
