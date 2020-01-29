const fs = require('fs');
const handlebars = require('handlebars');
const { exec } = require('child_process');
const { funcName, fileName, should } = require('minimist')(
  process.argv.slice(2),
);

const testsFolder = './__tests__';
const testFile = `${testsFolder}\\${fileName}.spec.ts`;
const webstormPath =
  'C:\\Users\\Ivan\\AppData\\Local\\JetBrains\\Toolbox\\apps\\WebStorm\\ch-0\\193.5233.80\\bin\\webstorm64.exe';

const template = `it.skip('should {{should}}', () => {
  const [exp, act] = [0, {{funcName}}()]
  expect(act).toBe(exp)
})\n\n`;

if (!fs.existsSync(testsFolder)) fs.mkdirSync(testsFolder);

if (!fs.existsSync(testFile)) fs.writeFileSync(testFile, '');

if (!fs.readFileSync(testFile, 'utf8').includes(`expect(${funcName}`)) {
  fs.appendFileSync(
    testFile,
    handlebars.compile(template)({ funcName, should }),
  );
}

exec(`${webstormPath} ${testFile}`);
