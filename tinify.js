const tinify = require('tinify');
const apiKey = require('./api_key');
const fs = require('fs');
const path = require('path');

tinify.key = apiKey;

// const source = tinify.fromFile('./screenshot/fiber.png');
// console.log(source);
// source.toFile('fiber.png');
// console.log(source);

const fromDir = (inDir, outDir, _files = []) => {
    const files = fs.readdirSync(inDir);
    for (let file of files) {
        const filePath = `${inDir}/${file}`;
        const toFilePath = `${outDir}/${file}`;
        if (fs.statSync(filePath).isDirectory()) {
            fromDir(filePath, toFilePath, _files)
        } else {
            try {
                fs.accessSync(toFilePath);
            } catch (err) {
                _files.push({
                    fromFile: filePath,
                    toFile: toFilePath,
                });
            }
        }
    }
    return _files;
}

const rootDir = fs.realpathSync(process.cwd());
const screenshotDir = path.resolve(rootDir, './screenshot');
const screenshotOutDir = path.resolve(rootDir, './screenshotout');

// const files = fromDir(screenshotDir, screenshotOutDir);

// console.log(files);