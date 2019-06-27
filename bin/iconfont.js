#!/user/bin/env node

const path = require('path');

const findupSync = require('findup-sync');
const program = require('commander');
const { iconfont } = require('../src/index');

program
  .version(require('../package').version)
  .usage('[options]')
  .option('-c, --config [value]',
    'Path to the config file [字符串] [默认值：icon2font.config.js]')
  .parse(process.argv);

let resolvedPath = '';
let options = {};
if (program.config) {
  resolvedPath = path.resolve(program.config);
} else {
  resolvedPath = findupSync('iconfont.config.js');
}

if (resolvedPath) {
  options = require(resolvedPath); // eslint-disable-line
}

iconfont(options);
