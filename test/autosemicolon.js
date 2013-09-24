var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli,
    filename = 'test.css';

exports.autosemicolon_true = function (test) {
    ([
        ['node', 'lol', '-f', filename, '-a', 'true'],
        ['node', 'lol', '-f', filename, '-a', '1'],
        ['node', 'lol', '-f', filename, '--autosemicolon', 'true'],
        ['node', 'lol', '-f', filename, '--autosemicolon', '1'],
        ['node', 'lol', '-f', filename, '-a'],
        ['node', 'lol', '-f', filename, '--autosemicolon'],
        // it's strange parsing of 'boolean' by optimist, isn't it?
        ['node', 'lol', '-f', filename, '-a', '0'],
        ['node', 'lol', '-f', filename, '-a', 'xxx'],
        ['node', 'lol', '-f', filename, '--autosemicolon', '0'],
        ['node', 'lol', '-f', filename, '--autosemicolon', 'xxx'],

    ]).forEach(function (argv) {
        process.argv = argv;

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options.autosemicolon, true);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });


    test.done();
};

exports.autosemicolon_false = function (test) {
    ([
        ['node', 'lol', '-f', filename, '-a', 'false'],
        ['node', 'lol', '-f', filename, '--autosemicolon', 'false'],
        ['node', 'lol', '-f', filename, '--no-a'],
        ['node', 'lol', '-f', filename, '--no-autosemicolon']
    ]).forEach(function (argv) {
        process.argv = argv;

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options.autosemicolon, false);
        test.strictEqual(typeof cssbeautifyCli.exit, 'undefined');
    });


    test.done();
};

exports.a_wrong = function (test) {
    process.argv = ['node', 'lol', '-f', filename, '-a', 'xxx'];

    ([
        ['node', 'lol', '-f', filename, '--autosemicolon=true'],
        ['node', 'lol', '-f', filename, '--autosemicolon=false']
    ]).forEach(function (argv) {
        process.argv = argv;

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options, null);
        test.strictEqual(cssbeautifyCli.exit.code, 1);
        test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.autosemicolon);
    });

    test.done();
};

exports.autosemicolon_wrong = function (test) {
    process.argv = ['node', 'lol', '-f', filename, '--autosemicolon', 'xxx'];

    ([
        ['node', 'lol', '-f', filename, '--autosemicolon=true'],
        ['node', 'lol', '-f', filename, '--autosemicolon=false']
    ]).forEach(function (argv) {
        process.argv = argv;

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options, null);
        test.strictEqual(cssbeautifyCli.exit.code, 1);
        test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.autosemicolon);
    });

    test.done();
};

exports['autosemicolon=_wrong'] = function (test) {
    process.argv = ['node', 'lol', '-f', filename, '--autosemicolon=xxx'];

    ([
        ['node', 'lol', '-f', filename, '--autosemicolon=true'],
        ['node', 'lol', '-f', filename, '--autosemicolon=false']
    ]).forEach(function (argv) {
        process.argv = argv;

        cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.strictEqual(cssbeautifyCli.options, null);
        test.strictEqual(cssbeautifyCli.exit.code, 1);
        test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.autosemicolon);
    });

    test.done();
};

