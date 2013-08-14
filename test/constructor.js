var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli;

exports.withoutNew = function (test) {
    cssbeautifyCli = CssbeautifyCli();
    test.strictEqual(cssbeautifyCli instanceof CssbeautifyCli, true);

    test.done();
};

exports.withNew = function (test) {
    cssbeautifyCli = new CssbeautifyCli();
    test.strictEqual(cssbeautifyCli instanceof CssbeautifyCli, true);

    test.done();
};
