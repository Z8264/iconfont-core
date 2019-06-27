/**
 * css模板
 * @param {object}
 * -- fontName {string} 字体名称，font-family属性值
 * -- prefix {string} class命名的前缀
 * -- base64 {string base64} 将woff转换为base64
 * -- icons {Array} 包含图标名称(name)和图标十六进制编码(hex)的集合
 */
module.exports = data => `@font-face{
  font-family:'${data.fontName}';
  src:url(data:application/font-woff;charset=utf-8;base64,${data.base64}) format("woff");
}
.${data.prefix},
[class^="${data.prefix}-"],
[class*=" ${data.prefix}-"]
{
  font-family: '${data.fontName}' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}${data.icons.map(icon => `
.${data.prefix}-${icon.name}:before {content:'\\${icon.hex}';}`).join('')}`;
