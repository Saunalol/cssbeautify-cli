var cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    filename = 'test.css';

exports.singleParam_f = function (test) {
    process.argv = ['node', 'lol', '-f', filename];

    options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.filename, filename, 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};

exports.singleParam_file = function (test) {
    process.argv = ['node', 'lol', '--file=' + filename];

    options = cssbeautifyCli.parse().process().options;

    (Object.keys(defaults)).forEach(function (option) {
        test.strictEqual(options[option], defaults[option], 'bad option ' + option);
    });
    test.strictEqual(cssbeautifyCli.filename, filename, 'bad filename');
    test.strictEqual(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object');

    test.done();
};
