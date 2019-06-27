const fs = require('fs');
const path = require('path');
const del = require('del');
const { normalizeSVGPath, generateFont } = require('../src/index');

// read file
const iconA = fs.readFileSync(path.join(__dirname, './svg/a.svg'));
const iconI = fs.readFileSync(path.join(__dirname, './svg/i.svg'));
const iconS = fs.readFileSync(path.join(__dirname, './svg/s.svg'));
const iconEllipse = fs.readFileSync(path.join(__dirname, './svg/ellipse.svg'));

// generate
const font = generateFont(
  [
    {
      name: 'a',
      hex: 0xe000,
      d: normalizeSVGPath(iconA),
    },
    {
      name: 'i',
      hex: 0xe001,
      d: normalizeSVGPath(iconI),
    },
    {
      name: 's',
      hex: 0xe002,
      d: normalizeSVGPath(iconS),
    },
    {
      name: 'ellipse',
      hex: 0xe003,
      d: normalizeSVGPath(iconEllipse),
    },
  ],
  'testfont',
  'test',
);

del.sync(path.join(__dirname, './dist/*'));

// write file
fs.writeFileSync(path.join(__dirname, './dist/font.svg'), font.svg);
fs.writeFileSync(path.join(__dirname, './dist/font.eot'), font.eot);
fs.writeFileSync(path.join(__dirname, './dist/font.ttf'), font.ttf);
fs.writeFileSync(path.join(__dirname, './dist/font.woff'), font.woff);
fs.writeFileSync(path.join(__dirname, './dist/font.woff2'), font.woff2);
fs.writeFileSync(path.join(__dirname, './dist/font.css'), font.css);
fs.writeFileSync(path.join(__dirname, './dist/font.html'), font.html);

test('function test', () => {
  const files = fs.readdirSync(path.join(__dirname, './dist'));
  expect(files.includes('font.css')).toBe(true);
});
