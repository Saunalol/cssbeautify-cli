var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    filename = 'test.css';

exports.openbrace = function (test) {
    var openbrace = ['end-of-line', 'separate-line'];

    openbrace.forEach(function (openbrace) {
        process.argv = ['node', 'lol', '-f', filename, '-o', openbrace];

        options = CssbeautifyCli().parse().process().options;

        test.strictEqual(options.openbrace, openbrace);
    });

    test.done();
};

exports.openbrace_wrong = function (test) {
    var openbrace = 'end-of-line-xxx';

    process.argv = ['node', 'lol', '-f', filename, '-o', openbrace];

    var cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.strictEqual(cssbeautifyCli.options, null);
    test.strictEqual(cssbeautifyCli.exit.code, 1);

    test.done();
};

