const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
const ttf2woff2 = require('ttf2woff2');

const normalizeSVG = require('./normalizeSVG');
const generateSvgFont = require('./generateSvgFont.js');
const generateCSS = require('./generateCSS');
const generateHTML = require('./generateHTML');

/**
 *
 * @param {*} options
 * font:{name,prefix}
 * icons:[{name,hex,svg},...]
 */

const generate = (options) => {
  const { font } = options.font;
  const { icons } = options.icons;

  const glyphs = icons.map(icon => ({
    name: `${font.prefix}-${icon.name}`,
    d: normalizeSVG(icon.svg),
    hex: icon.hex,
  }));

  const svg = generateSvgFont(glyphs);

  const ttf = Buffer.from(svg2ttf(svg).buffer);

  const eot = Buffer.from(ttf2eot(new Uint8Array(ttf)).buffer);

  const woff = Buffer.from(ttf2woff(new Uint8Array(ttf)).buffer);

  const woff2 = Buffer.from(ttf2woff2(new Uint8Array(ttf)).buffer);

  const base64 = woff.toString('base64');

  const css = generateCSS({
    font,
    base64,
    icons,
  });

  const html = generateHTML({
    font,
    icons,
    css,
  });

  return {
    svg, ttf, eot, woff, woff2, css, html,
  };
};


module.exports = generate;
