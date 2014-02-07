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

exports.i_spaces = function (test) {
    indentSpaces.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '-i', indent];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.strictEqual(cssbeautifyCli.options.indent, indent);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.indent_spaces = function (test) {
    indentSpaces.concat('').forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent', indent];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.strictEqual(cssbeautifyCli.options.indent, indent);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports['indent=_spaces'] = function (test) {
    indentSpaces.concat('').forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent='+indent];

        cssbeautifyCli = CssbeautifyCli().parse().process();
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
        test.strictEqual(cssbeautifyCli.options.indent, indent);
    });

    test.done();
};

exports.i_numbers = function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '-i', indent.value];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.strictEqual(cssbeautifyCli.options.indent, indent.expected);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.i_numbers2 = function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '-i'+indent.value];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.strictEqual(cssbeautifyCli.options.indent, indent.expected);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.indent_numbers = function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent', indent.value];

        cssbeautifyCli = CssbeautifyCli().parse().process();

        test.strictEqual(cssbeautifyCli.options.indent, indent.expected);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports['indent=_numbers'] = function (test) {
    indentNumbers.forEach(function (indent) {
        process.argv = ['node', fakeCommand, '-f', filename, '--indent=' + indent.value];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options.indent, indent.expected);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.i_wrong = function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '-i', wrongIndent];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.indent);

    test.done();
};

exports.indent_wrong = function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '--indent', wrongIndent];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.indent);

    test.done();
};

exports['indent=_wrong'] = function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '--indent', wrongIndent];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.indent);

    test.done();
};
