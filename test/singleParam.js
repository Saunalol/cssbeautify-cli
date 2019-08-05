const test = require('ava');
var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    fakeCommand = './bin/cssbeautify',
    options;

test('help', function (test) {
    process.argv = ['node', fakeCommand, '-h'];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();
    options = cssbeautifyCli.options;

    test.is(typeof options, 'undefined', 'bad options ' + JSON.stringify(options));

    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');

    test.is(typeof cssbeautifyCli.exit, 'object', 'bad exit');
    test.is(cssbeautifyCli.exit.code, 0, 'bad exit code');
});

test('version', function (test) {
    process.argv = ['node', fakeCommand, '-v'];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    options = cssbeautifyCli.options;

    test.is(typeof options, 'undefined', 'bad options ' + JSON.stringify(options));

    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');

    test.is(typeof cssbeautifyCli.exit, 'object', 'bad exit');
    test.is(cssbeautifyCli.exit.code, 0, 'bad exit code');
});
