var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

exports.shortForm = function (test) {
    process.argv = ['node', fakeCommand, '-s'];

    options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });

    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');
    test.strictEqual(cssbeautifyCli.stdin, true, 'bad stdin parameter: ' + cssbeautifyCli.stdin);

    test.done();
};

exports.longForm = function (test) {
    process.argv = ['node', fakeCommand, '--stdin'];

    options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });

    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.strictEqual(cssbeautifyCli.stdin, true, 'bad stdin parameter: ' + cssbeautifyCli.stdin)

    test.done();
};
