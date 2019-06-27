/**
 * svg font模板
 * @param {object}
 */
module.exports = font => `
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
<metadata></metadata>
<defs>
  <font horiz-adv-x="${font.width}">
    <font-face units-per-em="${font.height}" ascent="${font.ascent}" descent="${
  font.descent
}" />
    <missing-glyph horiz-adv-x="1024" />
    ${font.glyphs
    .map(
      glyph => `
    <glyph glyph-name="${glyph.name}"
      unicode="&#x${glyph.hex};"
      horiz-adv-x="${font.width}"
      d="${glyph.d}" />
    `,
    )
    .join('')}
  </font>
</defs>
</svg>
`;
