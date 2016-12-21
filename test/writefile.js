var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify',
    filename = 'test.css';

exports.w = function (test) {
    process.argv = ['node', fakeCommand, '-s', '-w', filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.writefile, filename, 'bad writefile');
    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};

exports.writefile = function (test) {
    process.argv = ['node', fakeCommand, '-s', '--writefile=' + filename];

    var options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.writefile, filename, 'bad writefile');
    test.strictEqual(typeof cssbeautifyCli.filename, 'undefined', 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};
