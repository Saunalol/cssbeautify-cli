var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    fakeCommand = './bin/cssbeautify';

exports.test = function (test) {
    process.argv = ['node', fakeCommand];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(typeof cssbeautifyCli.options, 'undefined', 'bad options ' + JSON.stringify(cssbeautifyCli.options));

    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.stdin, 'undefined', 'bad stdin option');

    test.strictEqual(typeof cssbeautifyCli.exit, 'object', 'bad exit object');
    test.strictEqual(cssbeautifyCli.exit.code, 1, 'bad exit code');
    test.strictEqual(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.file);

    test.done();
};

