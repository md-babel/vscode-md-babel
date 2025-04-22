# vscode-md-babel

Execute code blocks in Markdown documents using the `md-babel` CLI tool.


## Features

- Execute code blocks at the cursor position in Markdown files.
- View execution results directly in the document.


## Usage

1. Place cursor in a code block within a Markdown document.
2. Press <kbd>Cmd+Enter</kbd> (Mac) or <kbd>Ctrl+Enter</kbd> (Windows/Linux) to execute the block.
3. The output will replace the code block's content.


## Requirements

- `md-babel` executable must be installed separately. Get it here:  <https://github.com/md-babel/swift-markdown-babel>
- Configure the path to the executable in extension settings.


## Extension Settings

- `mdBabel.executablePath`: Path to the md-babel executable.


### Configuration

After installing the extension, set the path to your md-babel executable:

1. Open VS Code settings (Code → Preferences → Settings)
2. Search for "mdBabel"
3. Enter the full path to your md-babel executable
