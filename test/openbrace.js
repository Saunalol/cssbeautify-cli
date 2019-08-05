const test = require('ava');
var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli,
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

test('o', function (test) {
    var openbrace = ['end-of-line', 'separate-line'];

    openbrace.forEach(function (openbrace) {
        process.argv = ['node', fakeCommand, '-f', filename, '-o', openbrace];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.is(cssbeautifyCli.options.openbrace, openbrace);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('openbrace', function (test) {
    var openbrace = ['end-of-line', 'separate-line'];

    openbrace.forEach(function (openbrace) {
        process.argv = ['node', fakeCommand, '-f', filename, '--openbrace', openbrace];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.is(cssbeautifyCli.options.openbrace, openbrace);
        test.is(typeof cssbeautifyCli.exit, 'undefined');
    });
});

test('o_wrong', function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', fakeCommand, '-f', filename, '-o', openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.options, null);
    test.is(cssbeautifyCli.exit.code, 1);
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.openbrace);
});

test('openbrace_wrong', function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', fakeCommand, '-f', filename, '--openbrace', openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.options, null);
    test.is(cssbeautifyCli.exit.code, 1);
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.openbrace);
});

test('openbrace=_wrong', function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', fakeCommand, '-f', filename, '--openbrace='+openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.options, null);
    test.is(cssbeautifyCli.exit.code, 1);
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.openbrace);
});
