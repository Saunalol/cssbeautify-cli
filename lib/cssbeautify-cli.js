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
    optimist = require('optimist'),
    package = require('../package');

function CssbeautifyCli() {
    if (! (this instanceof CssbeautifyCli)) {
        return new CssbeautifyCli();
    }

    this.argv = null;
    this.options = null;
    this.filename = null;
    this.exit = null;
}

CssbeautifyCli.prototype.parse = function () {
    if (this.argv !== null) {
        this.argv = optimist.parse(process.argv);
    } else {
        this.argv = optimist
            .options('a', {
                alias: 'autosemicolon',
                'default': false
            })
            .boolean('autosemicolon')
            .describe('a', 'insert a semicolon after the last ruleset')
            .alias('f', 'file')
            .describe('f', 'file to beautify')
            .alias('h', 'help')
            .describe('h', 'show this help message')
            .options('i', {
                alias: 'indent',
                'default': '    '
            })
            .string('indent')
            .describe('i', 'string used for the indentation of the declaration (spaces, tabs or number of spaces)')
            .options('o', {
                alias: 'openbrace',
                'default': 'end-of-line'
            })
            .describe('o', 'the placement of open curly brace, either end-of-line or separate-line')
            .string('o')
            .alias('v', 'version')
            .describe('v', 'Display program version')
            .usage('Usage:\n\t$0 [options] -f filename')
            .parse(process.argv);
    }

    return this;
};

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
            console.log('Error: no input file.');
            console.log();
            optimist.showHelp();
        }, 1);
    } else {
        this.filename = this.argv.f;

        if (! (/^(\s*)$/).test(this.argv.indent)) {
            var indent = parseInt(this.argv.indent, 10);
            if (indent === (indent|0)) {
                for (var length = indent, indent = ''; indent.length < length; indent +=' ');
                this.argv.indent = this.argv.i = indent;
            } else {
                this.setExit(function () {
                    console.log('Error: invalid indent value, only spaces,tabs or number of spaces are allowed');
                },1);
            }
        }

        if ((['end-of-line', 'separate-line']).indexOf(this.argv.openbrace) === -1) {
            this.setExit(function () {
                console.log('Error: invalid openbrace value, use either "end-of-line" or "separate-line"');
            }, 1);
        }

        this.options = {
            indent: this.argv.indent,
            openbrace: this.argv.openbrace,
            autosemicolon: Boolean(this.argv.autosemicolon)
        };
    }

    return this;
};


CssbeautifyCli.prototype.setExit = function (exitFunction, exitCode) {
    this.exit =  {
        fn: (exitFunction && typeof exitFunction === 'function') ?
            exitFunction :
            function () {},
        code: exitCode || 0
    };
};

CssbeautifyCli.prototype.callback = function () {
    if (this.exit && this.exit.fn) {
        this.exit.fn();
        process.exit(this.exit.code|0);
    }
};



module.exports = CssbeautifyCli;
