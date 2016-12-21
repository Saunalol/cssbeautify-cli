var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

exports.singleParam_f = function (test) {
    process.argv = ['node', fakeCommand, '-f', filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.filename, filename, 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};

exports.singleParam_file = function (test) {
    process.argv = ['node', fakeCommand, '--file=' + filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.filename, filename, 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};

exports.overridesStdin_f = function (test) {
    process.argv = ['node', fakeCommand, '-f', filename, '--stdin'];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.filename, filename, 'bad filename');
    test.strictEqual(cssbeautifyCli.stdin, false, 'bad source: ' + cssbeautifyCli.stdin);
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};

exports.overridesStdin_file = function (test) {
    process.argv = ['node', fakeCommand, '--file=' + filename, '-s'];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.filename, filename, 'bad filename');
    test.strictEqual(cssbeautifyCli.stdin, false, 'bad source');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};
