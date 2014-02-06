[![NPM version](https://badge.fury.io/js/cssbeautify-cli.png)](http://badge.fury.io/js/cssbeautify-cli)[![Dependency Status](https://gemnasium.com/Saunalol/cssbeautify-cli.png)](https://gemnasium.com/Saunalol/cssbeautify-cli)[![Build Status](https://travis-ci.org/Saunalol/cssbeautify-cli.png?branch=master)](https://travis-ci.org/Saunalol/cssbeautify-cli)
# CSS Beautify CLI #

CLI for [cssbeautify](https://github.com/senchalabs/cssbeautify)

## Installation

    `npm install -g cssbeautify-cli`

## Usage ##

    `cssbeautify-bin [options] -f filename`

Options:
```
  -a, --autosemicolon  insert a semicolon after the last ruleset                                              [default: false]
  -c, --config         json config file to use
  -f, --file           file to beautify
  -h, --help           show this help message
  -i, --indent         string used for the indentation of the declaration (spaces, tabs or number of spaces)  [default: "    "]
  -o, --openbrace      the placement of open curly brace, either end-of-line or separate-line                 [default: "end-of-line"]
  -v, --version        Display program version

```

__Examples__
```
cssbeautify-cli -i2 -o "separate-line" -f ololo.css
cssbeautify-cli --indent="   " -f nyan.css
```

__Notes__
- Options from config override command line options.
- It seems to me that `optimist` introduces strange behaviour in some cases, e.g.
it's mpossible to pass empty `indent` option in the following form: `-i ''`,
but following solutions work just fine: `-i0`, `--indent ''`, `--indent=''`, `--indent=0`.
- The behaviour of boolean `-a` option is quite strange sometimes, check `test/autosemicolon.js` for
details.


## Versions
**0.3.0**
 * `-c` (`--config`) option added

**0.2.1**
 * some minor fixes

**0.2.0**
 * file is now passed in -f (--file) option

**0.1.0**
 * options -a (--autosemicolon), -h (--help), -i (--indent), -o (--openbrace), -v (--version)
 * file is passed as anonymous option
