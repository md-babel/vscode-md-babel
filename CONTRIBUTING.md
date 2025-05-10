# Contributing

To setup the development environment

1. [Download](https://github.com/md-babel/swift-markdown-babel/releases) the latest `md-babel` executable.
2. Set the path to the `md-babel` executable in `mdBabel.executablePath` in the settings.
3. Configure the global configuration file for `md-babel`.
   For [`examples/simple.md`](./examples/simple.md) you need to add

   ```json
   {
     "evaluators": {
       "codeBlock": {
         "sh": {
           "path": "/usr/bin/env",
           "defaultArguments": ["sh"],
           "result": "codeBlock"
         }
       }
     }
   }
   ```

   to the [global configuration file](https://github.com/md-babel/swift-markdown-babel#configuration-file) `~/.config/md-babel/config.json`.

4. To run the extension press <kbd>F5</kbd> or run the command **Debug: Start Debugging** from the
   Command Palette (<kbd>⇧⌘P</kbd> / <kbd>SHIFT + CTRL + P</kbd>). This will compile and run the extension in a new Extension Development Host window. [See also.](https://code.visualstudio.com/api/get-started/your-first-extension)
