const test = require('ava');
const fs = require('fs');

const CssbeautifyCli = require('../lib/cssbeautify-cli');
const fakeCommand = './bin/cssbeautify';
const filename = 'test.css';
const config = {
    indent: '123',
    autosemicolon: true,
    openbrace: 'end-of-line'
};
const configFileName = './' + (new Date()).getTime() + '.json';

test('missingValue', function (test) {
    ['-c', '-c=', '--config', '--config='].forEach(function (param) {

        process.argv = ['node', fakeCommand, '-f', filename, param];

        const cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.is(typeof cssbeautifyCli.exit, 'object', 'bad exit object');
        test.is(cssbeautifyCli.exit.code, 1, 'bad exit code');

    });
});

test('missingFile', function (test) {
    fs.writeFileSync(configFileName, JSON.stringify(config));

    ['-c', '-c=', '--config', '--config='].forEach(function (param) {
        process.argv = ['node', fakeCommand, '-f', filename, param, 'someNonexistingFile'];

        const cssbeautifyCli = CssbeautifyCli()
            .parse()
            .process();

        test.is(typeof cssbeautifyCli.exit, 'object', 'bad exit object');
        test.is(cssbeautifyCli.exit.code, 1, 'bad exit code');
    });

    fs.unlinkSync(configFileName);
});

test('correctlyRead', function (test) {
    fs.writeFileSync(configFileName, JSON.stringify(config));

    process.argv = ['node', fakeCommand, '-f', filename, '-c', configFileName];

    const cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(typeof cssbeautifyCli.exit, 'undefined', 'bad exit object: ' + JSON.stringify(cssbeautifyCli.exit));
    test.log(cssbeautifyCli.options.indent);
    test.is(cssbeautifyCli.options.indent.length, Number(config.indent));
    test.truthy(/\ +/.test(cssbeautifyCli.options.indent));
    test.is(cssbeautifyCli.options.autosemicolon, config.autosemicolon);
    test.is(cssbeautifyCli.options.openbrace, config.openbrace);

    fs.unlinkSync(configFileName);
});

test('overridesCommandLine', function (test) {
    const localConfig = {
        indent: 4,
        autosemicolon: 'false',
        openbrace: 'separate-line'
    };

    fs.writeFileSync(configFileName, JSON.stringify(localConfig));

    process.argv = ['node', fakeCommand,
        '-f', filename,
        '-c', configFileName,
        '-i', localConfig.indent,
        '-a', localConfig.autosemicolon,
        '-o', localConfig.openbrace
    ];

    const cssbeautifyCli = CssbeautifyCli()
        .parse()
        .process();

    test.is(cssbeautifyCli.exit, undefined, 'bad exit object: ' + JSON.stringify(cssbeautifyCli.exit));
    test.is(cssbeautifyCli.options.indent.length, Number(config.indent));
    test.true(/^ {123}$/.test(cssbeautifyCli.options.indent));
    test.is(cssbeautifyCli.options.autosemicolon, config.autosemicolon);
    test.is(cssbeautifyCli.options.openbrace, config.openbrace);


    fs.unlinkSync(configFileName);
});
