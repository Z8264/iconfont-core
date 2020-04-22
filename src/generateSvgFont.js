/**
* svg font模板
* @param {object}
*/
const {
  STANDARD_WIDTH, STANDARD_HEIGHT, FONT_ASCENT, FONT_DESCENT,
} = require('./consts');

module.exports = glyphs => `
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
<metadata></metadata>
<defs>
  <font horiz-adv-x="${STANDARD_WIDTH}">
    <font-face units-per-em="${STANDARD_HEIGHT}" ascent="${FONT_ASCENT}" descent="${FONT_DESCENT}" />
    <missing-glyph horiz-adv-x="1024" />
    ${glyphs
    .map(
      item => `
    <glyph glyph-name="${item.name}"
      unicode="&#x${item.hex};"
      horiz-adv-x="${STANDARD_WIDTH}"
      d="${item.d}" />
    `,
    )
    .join('')}
  </font>
</defs>
</svg>
`;
