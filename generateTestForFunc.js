const fs = require('fs');
const handlebars = require('handlebars');
const { exec } = require('child_process');
const { funcName, fileName, should } = require('minimist')(
  process.argv.slice(2),
);

const testFile = `${fileName}.spec.ts`;

const template = `it.skip('should {{should}}', () => {
  const [exp, act] = [0, {{funcName}}()]
  expect(act).toBe(exp)
})\n\n`;

if (!fs.existsSync(testFile)) fs.writeFileSync(testFile, '');

if (!fs.readFileSync(testFile, 'utf8').includes(`expect(${funcName}`)) {
  fs.appendFileSync(
    testFile,
    handlebars.compile(template)({ funcName, should }),
  );
}

