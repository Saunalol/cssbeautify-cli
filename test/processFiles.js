var os = require('os'),
    path = require('path'),
    fs = require('fs'),
    cssbeautifyCli = require('../lib/cssbeautify-cli')(),
    defaults = {
        indent: '    ', // 4 spaces
        openbrace: 'end-of-line',
        autosemicolon: false
    },
    fakeCommand = './bin/cssbeautify',
    tmpDir = os.tmpdir();

exports.singleFile_noFileNameComment = function (test) {
    test.expect(1);
    var testOutputFile = path.join(tmpDir, process.pid + 'singleFile_noFileNameComment');
    var expectedOutput = fs.readFileSync('test/files/green_css_output', { 'encoding': 'utf-8' });

    process.argv = ['node', fakeCommand, '--file=test/files/green.css', '-w', testOutputFile];

    options = cssbeautifyCli.parse().process().options;

    cssbeautifyCli.processFiles(function() {
        fs.fsync(cssbeautifyCli._fd, function () {
            setTimeout(function () {
                fs.readFile(testOutputFile, 'utf8', function (err, data) {
                    test.strictEqual(data, expectedOutput);
                    test.done();
                });
            }, 10);
        });
    });
};

exports.multipleInputFiles = function (test) {
    test.expect(1);
    var testOutputFile = path.join(tmpDir, process.pid + 'multipleInputFiles');
    var expectedOutput = fs.readFileSync('test/files/multifile_output', { 'encoding': 'utf-8' });

    process.argv = ['node', fakeCommand, '--file=test/**/*.css', '-w', testOutputFile];

    options = cssbeautifyCli.parse().process().options;

    cssbeautifyCli.processFiles(function() {
        fs.fsync(cssbeautifyCli._fd, function () {
            setTimeout(function () {
                fs.readFile(testOutputFile, 'utf8', function (err, data) {
                    test.strictEqual(data, expectedOutput, 'FUBAR (' + data + ')!');
                    test.done();
                });
            }, 100);
        });
    });
};
