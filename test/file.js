const test = require('ava');
var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

test('singleParam_f', function (test) {
    process.argv = ['node', fakeCommand, '-f', filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });
    test.is(cssbeautifyCli.filename, filename, 'bad filename');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
});

test('singleParam_file', function (test) {
    process.argv = ['node', fakeCommand, '--file=' + filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });
    test.is(cssbeautifyCli.filename, filename, 'bad filename');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
});

test('overridesStdin_f', function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '--stdin'];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });
    test.is(cssbeautifyCli.filename, filename, 'bad filename');
    test.is(cssbeautifyCli.stdin, false, 'bad source: ' + cssbeautifyCli.stdin);
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
});

test('overridesStdin_file', function (test) {
    process.argv = ['node', fakeCommand, '--file=' + filename, '-s'];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.is(options[option], defaults[option], 'bad option ' + option);
    });
    test.is(cssbeautifyCli.filename, filename, 'bad filename');
    test.is(cssbeautifyCli.stdin, false, 'bad source');
    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
});
