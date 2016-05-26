#!/usr/bin/env node
/*
Copyright 2013 Igor Shevchenko

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*jslint node:true */

var fs = require('fs'),
    optimist = require('optimist')
        .options('a', {
            alias: 'autosemicolon',
            'default': false
        })
        .boolean('autosemicolon')
        .describe('a', 'insert a semicolon after the last ruleset')
        .boolean('a')
        .alias('c', 'config')
        .describe('c', 'json config file to use')
        .alias('f', 'file')
        .describe('f', 'file to beautify or glob pattern')
        .alias('h', 'help')
        .describe('h', 'show this help message')
        .options('i', {
            alias: 'indent',
            'default': '    '
        })
        .describe('i', 'string used for the indentation of the declaration (spaces, tabs or number of spaces)')
        .options('o', {
            alias: 'openbrace',
            'default': 'end-of-line'
        })
        .describe('o', 'the placement of open curly brace, either end-of-line or separate-line')
        .string('o')
        .alias('s', 'stdin')
        .describe('s', 'use stdin as input')
        .alias('v', 'version')
        .describe('v', 'Display program version')
        .alias('w', 'writefile')
        .describe('w', 'write output to file')
        .usage('Usage:\n\t$0 [options] -f filename\n\t$0 [options] -s'),
    package = require('../package'),
    isUndefined = function (value) {
        return typeof value === 'undefined';
    };


/**
 * @constructor
 * may be invoked without new operator
 */
function CssbeautifyCli() {
    if (! (this instanceof CssbeautifyCli)) {
        return new CssbeautifyCli();
    }
}

CssbeautifyCli.optionNames = ['autosemicolon', 'indent', 'openbrace'];

CssbeautifyCli.ERRORS = {
    autosemicolon: function () {
        console.log('Error: invalid autosemicolon value, use boolean');
    },
    configFile: function (e) {
        console.log('Error: could not read config file: ', e);
    },
    file: function () {
        console.log('Error: no input file.\n');
        optimist.showHelp();
    },
    indent: function () {
        console.log('Error: invalid indent value, only spaces,tabs or number of spaces are allowed');
    },
    openbrace: function () {
        console.log('Error: invalid openbrace value, use either "end-of-line" or "separate-line"');
    },
    kindaerror: function () {
        console.log('Error: kinda unknown error occured');
    }
};

/**
 * Processes process.argv with optimist and saves result to this.argv
 * @return {CssbeautifyCli} instance for chaining
 */
CssbeautifyCli.prototype.parse = function () {
    this.argv = optimist.parse(process.argv);

    return this;
};

/**
 * Checks parameter validity
 * @param  {string}  name
 * @param  {string}  value
 * @return {Boolean}
 */
function isValid(name, value) {
    var tests = {
        indent: function (value) {
            return (/^(\s*|\d*)$/).test(value);
        },
        openbrace: function (value) {
            return (['end-of-line', 'separate-line']).indexOf(value) !== -1;
        },
        autosemicolon: function (value) {
            return typeof value === 'boolean';
        }
    };

    return Boolean(tests[name] && tests[name](value));
}

CssbeautifyCli.prototype.PROCESSORS = {
    indent: function (value) {
        var indent = parseInt(value, 10);

        if (indent === indent|0) {
            for (var length = indent, indent = ''; indent.length < length; indent += ' ');
            this.options.indent = indent;
        } else {
            this.options.indent = value;
        }
    }
};

CssbeautifyCli.prototype.processOption = function (name) {
    if (! isValid(name, this.argv[name])) {
        this.setExit((CssbeautifyCli.ERRORS[name] ?
            CssbeautifyCli.ERRORS[name] : CssbeautifyCli.ERRORS.kindaerror), 1);
    } else if (isUndefined(this.options[name])) {
        if (this.PROCESSORS[name]) {
            this.PROCESSORS[name].call(this, this.argv[name]);
        } else {
            this.options[name] = this.argv[name];
        }
    }

    return this;
};

CssbeautifyCli.prototype.processConfig = function () {
    var self = this;

    if (! isUndefined(this.argv.config)) {
        try {
            var config = require(process.cwd() + '/' + this.argv.config);

            CssbeautifyCli.optionNames.forEach(function (name) {
                if (! isUndefined(config[name])) {
                    self.options = self.options || {};
                    if (isValid(name, config[name])) {
                        self.PROCESSORS[name] ?
                            self.PROCESSORS[name].call(self, config[name]) :
                            (self.options[name] = config[name]);
                    }
                }
            });
        } catch (e) {
            this.setExit(function(e) {CssbeautifyCli.ERRORS.configFile(e);}, 1);
        }
    }

    return this;
};

/**
 * Processes parameters provided (using command line/config)
 * @return {CssbeautifyCli} instance for chaining
 */
CssbeautifyCli.prototype.process = function () {
    var self = this;

    if (this.argv.h) {
        this.setExit(function () {
            optimist.showHelp();
        });
    } else if (this.argv.v) {
        this.setExit(function () {
            console.log(package.name + ' version ' + package.version);
        });
    } else if (! this.argv.f && ! this.argv.s) {
        this.setExit(CssbeautifyCli.ERRORS.file, 1);
    } else {
        this.options = {};
        this.writefile = this.argv.w;

        if (this.argv.f) {
            this.filename = this.argv.f;
            this.stdin = false;
        } else {
            this.stdin = true;
        }

        CssbeautifyCli.optionNames.forEach(function (name) {
            self.processOption(name);
        });

        this.processConfig();

        if (this.exit && this.exit.code !== 0) {
            this.options = null;
        }
    }

    return this;
};

/**
 * Creates exit object for future use in callback function
 * @param {function} exitFunction
 * @param {number} exitCode
 * @return {CssbeautifyCli} instance for chaining
 */
CssbeautifyCli.prototype.setExit = function (exitFunction, exitCode) {
    this.exit =  {
        fn: (exitFunction && typeof exitFunction === 'function') ?
            exitFunction :
            function () {},
        code: exitCode|0
    };

    return this;
};

/**
 * Sets callback parameter if exit function is available
 * @return {CssbeautifyCli} instance for chaining
 */
CssbeautifyCli.prototype.callback = function () {
    if (this.exit && this.exit.fn) {
        this.exit.fn();
        process.exit(this.exit.code);
    }

    return this;
};

module.exports = CssbeautifyCli;
