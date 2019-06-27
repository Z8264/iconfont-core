const svgpath = require('svgpath');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
const ttf2woff2 = require('ttf2woff2');

const SVGFontTemplate = require('./SVGFontTemplate');
const CSSTemplate = require('./CSSTemplate');
const HTMLTemplate = require('./HTMLTemplate');

const FONT_ASCENT = 896; // iconfont 896  icomoon 960
const FONT_DESCENT = -128; // iconfont -128 icomoon -64

/**
 * 生成字体
 * @param {Array} icons
 * @param {String} fontName
 * @param {String} prefix
 *  -- name   图标名称
 *  -- hex    十六进制编码，用于图标unicode
 *  -- d      图标d属性值 -- 符合标准化
 * @returns { svg, ttf, eot, woff, woff2, css, html }
 */
function generate(icons, fontName = 'iconfont', prefix = 'icon') {
  /**
   * 将icon做path偏移
   * 偏移量：0 -64
   * 偏移原因：为了适配字体基线
   */
  const glyphs = icons.map((icon) => {
    const name = `${prefix}-${icon.name}`;
    const d = svgpath(icon.d)
      .matrix([1, 0, 0, -1, 0, 1024])
      .translate(0, FONT_DESCENT)
      .rel()
      .round(1)
      .toString();
    const { hex } = icon;
    return { name, d, hex };
  });
  /**
   * svg
   */
  const svg = SVGFontTemplate({
    width: 1024,
    height: 1024,
    ascent: FONT_ASCENT,
    descent: FONT_DESCENT,
    glyphs,
  });
  /**
   * ttf
   */
  const ttf = Buffer.from(svg2ttf(svg).buffer);
  /**
   * eot
   */
  const eot = Buffer.from(ttf2eot(new Uint8Array(ttf)).buffer);
  /**
   * woff
   */
  const woff = Buffer.from(ttf2woff(new Uint8Array(ttf)).buffer);
  /**
   * woff2
   */
  const woff2 = Buffer.from(ttf2woff2(new Uint8Array(ttf)).buffer);
  /**
   * base64
   */
  const base64 = woff.toString('base64');
  /**
   * css
   */
  const css = CSSTemplate({
    fontName,
    prefix,
    base64,
    icons,
  });
  /**
   * html
   */
  const html = HTMLTemplate({
    fontName,
    prefix,
    css,
    icons,
  });

  return {
    svg, ttf, eot, woff, woff2, css, html,
  };
}
module.exports = generate;
