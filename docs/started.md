
# 起步

## 文件目录

> iconfont-core 并不限制你的目录结构，以下示例仅作为参考。

**project**

```
|- svg
  |- a.svg
  |- b.svg
  |- c.svg
|- iconfont.config.js
|- package.json
```
* svg 文件夹下用来存放svg格式的图标文件。
* iconfont.config.js iconfont配置文件
* package.json

## 配置文件

**iconfont.config.js**
```
const path = require('path');

module.exports = {
  entry: './svg',
  output: './dist',
}
```
* entry: 存放图标的位置
* output: 字体文件的输出位置

**package.json**
```

```