const test = require('ava');
var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli,
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css',
    indentNumbers = [
        {
            value: '0',
            expected: ''
        },
        {
            value: '1',
            expected: ' '
        },
        {
            value: '4',
            expected: '    '
        }
    ],
    indentSpaces = [' ', '  ', '     '],
    wrongIndent = 'xxx';

test('i_spaces', function (test) {
    indentSpaces.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '-i', indent];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.is(cssbeautifyCli.options.indent, indent);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('indent_spaces', function (test) {
    indentSpaces.concat('').forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent', indent];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.is(cssbeautifyCli.options.indent, indent);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('indent=_spaces', function (test) {
    indentSpaces.concat('').forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent='+indent];

        cssbeautifyCli = CssbeautifyCli().parse().process();
        test.is(typeof cssbeautifyCli.exit, 'undefined');
        test.is(cssbeautifyCli.options.indent, indent);
    });
});

test('i_numbers', function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '-i', indent.value];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.is(cssbeautifyCli.options.indent, indent.expected);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('i_numbers2', function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '-i'+indent.value];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.is(cssbeautifyCli.options.indent, indent.expected);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('indent_numbers', function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent', indent.value];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.is(cssbeautifyCli.options.indent, indent.expected);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('indent=_numbers', function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent=' + indent.value];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.is(cssbeautifyCli.options.indent, indent.expected);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('i_wrong', function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '-i', wrongIndent];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.options, null);
    test.is(cssbeautifyCli.exit.code, 1);
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.indent);
});

test('indent_wrong', function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '--indent', wrongIndent];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.options, null);
    test.is(cssbeautifyCli.exit.code, 1);
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.indent);
});

test('indent=_wrong', function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '--indent', wrongIndent];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.options, null);
    test.is(cssbeautifyCli.exit.code, 1);
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.indent);
});
