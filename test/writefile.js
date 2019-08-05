const test = require('ava');
var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

test('w', function (test) {
    process.argv = ['node', fakeCommand, '-s', '-w', filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });
    test.is(cssbeautifyCli.writefile, filename, 'bad writefile');
    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
});

test('writefile', function (test) {
    process.argv = ['node', fakeCommand, '-s', '--writefile=' + filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });
    test.is(cssbeautifyCli.writefile, filename, 'bad writefile');
    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
});
