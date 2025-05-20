import { Configuration } from "../configuration";

// https://github.com/md-babel/md-babel-schema/blob/main/config/README.md#how-to-define-code-evaluator-backends
const bashRubyPython: Configuration = {
  evaluators: {
    codeBlock: {
      bash: {
        path: "/usr/bin/env",
        defaultArguments: ["bash"],
        result: "codeBlock",
      },
      ruby: {
        path: "/usr/bin/env",
        defaultArguments: ["ruby"],
        result: "codeBlock",
      },
      python: {
        path: "/Users/YOUR_USER_NAME/.config/md-babel/python3env/bin/python3",
        defaultArguments: [],
        result: "codeBlock",
      },
    },
  },
};

// https://github.com/md-babel/swift-markdown-babel/blob/main/Examples.md#emacs-lisp-evaluation
const emacsLisp: Configuration = {
  evaluators: {
    codeBlock: {
      elisp: {
        path: "/usr/bin/env",
        defaultArguments: ["emacsclient", "--eval"],
        result: "codeBlock",
      },
    },
  },
};

// https://github.com/md-babel/swift-markdown-babel/blob/main/Examples.md#mermaid-graph-rendering
const mermaid: Configuration = {
  evaluators: {
    codeBlock: {
      mermaid: {
        path: "/path/to/mmdc",
        defaultArguments: [
          "--input",
          "-",
          "--outputFormat",
          "svg",
          "--output",
          "-",
        ],
        result: {
          type: "image",
          extension: "svg",
          directory: "./images/",
          filename: "yyyyMMddHHmmss'--$fn__$hash'",
        },
      },
    },
  },
};

// https://github.com/md-babel/swift-markdown-babel/blob/main/Examples.md#plantuml-graph-rendering
const plantUml: Configuration = {
  evaluators: {
    codeBlock: {
      plantuml: {
        path: "/path/to/plantuml",
        defaultArguments: ["-pipe", "-noerror", "-tsvg"],
        result: {
          type: "image",
          extension: "svg",
          directory: "./images/",
          filename: "yyyyMMddHHmmss'--$fn__$hash'",
        },
      },
    },
  },
};

// https://github.com/md-babel/swift-markdown-babel/blob/main/Examples.md#rest-api-testing-via-hurl
const hurl = {
  evaluators: {
    codeBlock: {
      hurl: {
        path: "/path/to/hurl",
        defaultArguments: [],
        result: "codeBlock",
      },
    },
  },
};
