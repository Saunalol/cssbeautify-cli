const test = require('ava');
var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    fakeCommand = './bin/cssbeautify';

test('noParam', function (test) {
    process.argv = ['node', fakeCommand];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(typeof cssbeautifyCli.options, 'undefined', 'bad options ' + JSON.stringify(cssbeautifyCli.options));

    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.is(typeof cssbeautifyCli.stdin, 'undefined', 'bad stdin option');
    test.is(typeof cssbeautifyCli.writefile, 'undefined', 'bad writefile');

    test.is(typeof cssbeautifyCli.exit, 'object', 'bad exit object');
    test.is(cssbeautifyCli.exit.code, 1, 'bad exit code');
    test.is(cssbeautifyCli.exit.fn, CssbeautifyCli.ERRORS.file);
});