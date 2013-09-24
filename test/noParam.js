var CssbeautifyCli = require('../lib/cssbeautify-cli');

exports.test = function (test) {
    process.argv = ['node', 'lol'];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(typeof cssbeautifyCli.options, 'undefined', 'bad options ' + JSON.stringify(cssbeautifyCli.options));

    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');

    test.strictEqual(typeof cssbeautifyCli.exit, 'object', 'bad exit');
    test.strictEqual(cssbeautifyCli.exit.code, 1, 'bad exit code');
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.file);

    test.done();
};

