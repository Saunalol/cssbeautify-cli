var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli,
    filename = 'test.css';

exports.o = function (test) {
    var openbrace = ['end-of-line', 'separate-line'];

    openbrace.forEach(function (openbrace) {
        process.argv = ['node', 'lol', '-f', filename, '-o', openbrace];

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
        process.argv = ['node', 'lol', '-f', filename, '--openbrace', openbrace];

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
        process.argv = ['node', 'lol', '-f', filename, '--openbrace=' + openbrace];

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options.openbrace, openbrace);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });

    test.done();
};

exports.openbrace_wrong = function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', 'lol', '-f', filename, '-o', openbrace];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);

    test.done();
};

