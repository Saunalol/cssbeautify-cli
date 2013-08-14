# CSS Beautify CLI #

CLI for [cssbeautify](https://github.com/senchalabs/cssbeautify)

## Usage ##

    `cssbeautify-bin [options] -f filename`

Options:
```
  -a, --autosemicolon  insert a semicolon after the last ruleset                                              [default: false]
  -f, --file           file to beautify
  -h, --help           show this help message
  -i, --indent         string used for the indentation of the declaration (spaces, tabs or number of spaces)  [default: "    "]
  -o, --openbrace      the placement of open curly brace, either end-of-line or separate-line                 [default: "end-of-line"]
  -v, --version        Display program version

```

## Versions
### 0.2.0
 * file is now passed in -f (--file) option
### 0.1.0
 * options -a (--autosemicolon), -h (--help), -i (--indent), -o (--openbrace), -v (--version)
 * file is passed as anonymous option
