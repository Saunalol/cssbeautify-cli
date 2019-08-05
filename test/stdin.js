const test = require('ava');
var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify';

test('shortForm', function (test) {
    process.argv = ['node', fakeCommand, '-s'];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });

    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
    test.is(cssbeautifyCli.stdin, true, 'bad stdin parameter: ' + cssbeautifyCli.stdin);
});

test('longForm', function (test) {
    process.argv = ['node', fakeCommand, '--stdin'];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });

    test.is(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.is(cssbeautifyCli.stdin, true, 'bad stdin parameter: ' + cssbeautifyCli.stdin);
});
