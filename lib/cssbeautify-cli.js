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
        .alias('f', 'file')
        .describe('f', 'file to beautify')
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
        .alias('v', 'version')
        .describe('v', 'Display program version')
        .usage('Usage:\n\t$0 [options] -f filename'),
    package = require('../package');

/**
 * @constructor
 * may be invoked without new operator
 */
function CssbeautifyCli() {
    if (! (this instanceof CssbeautifyCli)) {
        return new CssbeautifyCli();
    }

    this.options = null;
    this.filename = null;
}

/**
 * Processes process.argv with optimist and saves result to this.argv
 * @return {CssbeautifyCli} instance for chaining
 */
CssbeautifyCli.prototype.parse = function () {
    this.argv = optimist.parse(process.argv);

    return this;
};

/**
 * Chechs parameter validity
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

/**
 * Processes parameters provided (using command line/config)
 * @return {CssbeautifyCli} instance for chaining
 */
CssbeautifyCli.prototype.process = function () {
    if (this.argv.h) {
        this.setExit(function () {
            optimist.showHelp();
        });
    } else if (this.argv.v) {
        this.setExit(function () {
            console.log(package.name + ' version ' + package.version);
        });
    } else if (! this.argv.f) {
        this.setExit(function () {
            console.log('Error: no input file.\n');
            optimist.showHelp();
        }, 1);
    } else {
        this.filename = this.argv.f;

        if (! isValid('indent', this.argv.indent)) {
            this.setExit(function () {
                console.log('Error: invalid indent value, only spaces,tabs or number of spaces are allowed');
            }, 1);
        } else {
            var indent = parseInt(this.argv.indent, 10);

            if (indent === indent|0) {
                for (var length = indent, indent = ''; indent.length < length; indent +=' ');
                this.argv.indent = this.argv.i = indent;
            }
        }

        if (! isValid('openbrace', this.argv.openbrace)) {
            this.setExit(function () {
                console.log('Error: invalid openbrace value, use either "end-of-line" or "separate-line"');
            }, 1);
        }

        if (! isValid('autosemicolon', this.argv.a)) {
            this.setExit(function () {
                console.log('Error: invalid autosemicolon value, use boolean');
            }, 1);
        }

        this.options = this.exit && this.exit.code !== 0 ? null : {
            indent: this.argv.indent,
            openbrace: this.argv.openbrace,
            autosemicolon: Boolean(this.argv.autosemicolon)
        };
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
};

module.exports = CssbeautifyCli;
