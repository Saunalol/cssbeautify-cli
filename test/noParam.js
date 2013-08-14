var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    options,
    filename = 'lol.css';

exports.test = function (test) {
    process.argv = ['node', 'lol'];

    cssbeautifyCli = require('../lib/cssbeautify-cli')()
        .parse()
        .process();
    options = cssbeautifyCli.options;

    test.strictEqual(options, null, 'bad options ' + JSON.stringify(options));

    test.strictEqual(cssbeautifyCli.filename, null, 'bad filename');

    test.strictEqual(typeof cssbeautifyCli.exit, 'object', 'bad exit');
    test.strictEqual(cssbeautifyCli.exit.code, 1, 'bad exit code');

    test.done();
};

