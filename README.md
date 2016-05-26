[![NPM version](https://badge.fury.io/js/cssbeautify-cli.png)](http://badge.fury.io/js/cssbeautify-cli)[![Dependency Status](https://gemnasium.com/Saunalol/cssbeautify-cli.png)](https://gemnasium.com/Saunalol/cssbeautify-cli)[![Build Status](https://travis-ci.org/Saunalol/cssbeautify-cli.png?branch=master)](https://travis-ci.org/Saunalol/cssbeautify-cli)
# CSS Beautify CLI #

CLI for [cssbeautify](https://github.com/senchalabs/cssbeautify)

## Installation

    npm install -g cssbeautify-cli

## Usage ##

    cssbeautify-cli [options] -f filename
    cssbeautify-cli [options] -f glob/**/*.pattern

Options:
```
-a, --autosemicolon  insert a semicolon after the last ruleset                                              [default: false]
-c, --config         json config file to use
-f, --file           file to beautify or glob pattern
-h, --help           show this help message
-i, --indent         string used for the indentation of the declaration (spaces, tabs or number of spaces)  [default: "    "]
-o, --openbrace      the placement of open curly brace, either end-of-line or separate-line                 [default: "end-of-line"]
-s, --stdin          use stdin
-v, --version        Display program version
-w, --writefile      write output to file
```

__Examples__
```
cssbeautify-cli -i2 -o "separate-line" -f ololo.css
cssbeautify-cli --indent="   " -f nyan.css
cssbeautify-cli -f "src/**/*.css" -w dst/style.css
```

__Notes__
- options from config override command line options
- `optimist` introduces strange behaviour in some cases, e.g.
it's impossible to pass empty `indent` option in the following form: `-i ''`,
but these solutions work just fine: `-i0`, `--indent ''`, `--indent=''`, `--indent=0`
- The behaviour of boolean `-a` option is quite strange sometimes, check `test/autosemicolon.js` for
details
- file option is used if both file and stdin options are passed
- glob patterns should be quoted to avoid shell pattern matching
- output from multiple files is written into a single destination (file or STDOUT) using
  `/*** FILENAME ***/` as separator


## Versions
**0.5.2**
 * `-f` option now supports [glob](https://www.npmjs.com/package/glob)

**0.5.0**
 * `-w` (`--writefile`) option added

**0.4.1**
 * `help` output fixed

**0.4.0**
 * `-s` (`--stdin`) option added
 * node 0.8 support dropped

**0.3.0**
 * `-c` (`--config`) option added

**0.2.1**
 * some minor fixes

**0.2.0**
 * file is now passed in `-f` (`--file`) option

**0.1.0**
 * options `-a` (`--autosemicolon`), `-h` (`--help`), `-i` (`--indent`), `-o` (`--openbrace`), `-v` (`--version`)
 * file is passed as anonymous option
