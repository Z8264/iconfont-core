
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

const normalizeSVGPath = require('./normalize/normalize');
const generateFont = require('./generate/generate');

async function getIcons(dir, code = 0xe000) {
  const files = glob.sync(path.join(dir, '**/*.svg'));
  const namesCache = {};

  const promises = [];
  files.forEach((file, i) => {
    promises.push(new Promise((resolve) => {
      const fileName = path.basename(file).replace('.svg', '');

      // name
      let name = fileName;
      let count = 0;
      while (namesCache[name]) {
        count += 1;
        name = `${fileName}_${count}`;
      }
      namesCache[name] = true;
      // hex
      const hex = code + i;

      fs.readFile(path.resolve(file), (err, data) => {
        resolve({
          name,
          hex,
          d: normalizeSVGPath(data),
        });
      });
    }));
  });
  return Promise.all(promises);
}

function preprocess(args) {
  return Object.assign({
    name: 'iconfont',
    prefix: 'icon',
    entry: './',
    output: './dist',
    html: true,
    startCode: 0xe000,
  }, args);
}

async function generate(option) {
  const icons = await getIcons(option.entry, option.startCode);
  const font = generateFont(icons, option.name, option.prefix);
  if (!fs.existsSync(option.output)) {
    fs.mkdirSync(option.output);
  }
  fs.writeFileSync(path.join(option.output, `/${option.name}.css`), font.css);
  if (option.html) {
    fs.writeFileSync(path.join(option.output, `/${option.name}.html`), font.html);
  }
  return `[${option.name}.css] ${icons.length} icons [build]`;
}

/**
 * icon2font
 * @param {*} options
 */
module.exports = async function icon2font(args = {}) {
  const start = new Date();

  const options = [];

  // 初始化参数
  if (Array.isArray(args) && args.length > 0) {
    args.forEach((item) => {
      options.push(preprocess(item));
    });
  } else if (Object.prototype.toString.call(args).toLowerCase() === '[object object]') {
    options.push(preprocess(args));
  } else {
    console.log('参数错误');
  }

  // 生成字体
  const promises = [];
  options.forEach((option) => {
    promises.push(generate(option));
  });

  // 输出信息
  return Promise.all(promises).then((msgs) => {
    const end = new Date();
    msgs.forEach((msg) => {
      console.log(msg);
    });
    console.log(`${chalk.green('✔ build success')}`);
    console.log(end - start);
  });
};
