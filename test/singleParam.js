var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    fakeCommand = './bin/cssbeautify',
    options;

exports.help = function (test) {
    process.argv = ['node', fakeCommand, '-h'];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();
    options = cssbeautifyCli.options;

    test.strictEqual(typeof options, 'undefined', 'bad options ' + JSON.stringify(options));

    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');

    test.strictEqual(typeof cssbeautifyCli.exit, 'object', 'bad exit');
    test.strictEqual(cssbeautifyCli.exit.code, 0, 'bad exit code');

    test.done();
};

exports.version = function (test) {
    process.argv = ['node', fakeCommand, '-v'];

    cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    options = cssbeautifyCli.options;

    test.strictEqual(typeof options, 'undefined', 'bad options ' + JSON.stringify(options));

    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');

    test.strictEqual(typeof cssbeautifyCli.exit, 'object', 'bad exit');
    test.strictEqual(cssbeautifyCli.exit.code, 0, 'bad exit code');

    test.done();
};
