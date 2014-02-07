var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli,
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

exports.o = function (test) {
    var openbrace = ['end-of-line', 'separate-line'];

    openbrace.forEach(function (openbrace) {
        process.argv = ['node', fakeCommand, '-f', filename, '-o', openbrace];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options.openbrace, openbrace);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.openbrace = function (test) {
    var openbrace = ['end-of-line', 'separate-line'];

    openbrace.forEach(function (openbrace) {
        process.argv = ['node', fakeCommand, '-f', filename, '--openbrace', openbrace];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options.openbrace, openbrace);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.o_wrong = function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', fakeCommand, '-f', filename, '-o', openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.openbrace);

    test.done();
};

exports.openbrace_wrong = function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', fakeCommand, '-f', filename, '--openbrace', openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.openbrace);

    test.done();
};

exports['openbrace=_wrong'] = function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', fakeCommand, '-f', filename, '--openbrace='+openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.openbrace);

    test.done();
};
