const test = require('ava');
var CssbeautifyCli = require('../lib/cssbeautify-cli'),
    cssbeautifyCli;

test('withoutNew', function (test) {
    cssbeautifyCli = CssbeautifyCli();
    test.is(cssbeautifyCli instanceof CssbeautifyCli, true);
});

test('withNew', function (test) {
    cssbeautifyCli = new CssbeautifyCli();
    test.is(cssbeautifyCli instanceof CssbeautifyCli, true);
});
