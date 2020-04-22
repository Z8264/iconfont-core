

const Sax = require('sax');
const svgpath = require('svgpath');
const shapeToPath = require('./shape2path');

const {
  STANDARD_WIDTH, STANDARD_HEIGHT, STANDARD_ROUND, FONT_DESCENT,
} = require('./consts');

/**
 * normalizeSVG
 * @param {Buffer || String} buffer
 * @return {String} d
 */
module.exports = function normalizeSVG(buffer) {
  const sax = Sax.createStream(true);
  const paths = [];
  let vb;
  let x;
  let y;
  let w;
  let h;
  let d;

  sax.on('opentag', (tag) => {
    switch (tag.name) {
      case 'svg':
        vb = 'viewBox' in tag.attributes ? tag.attributes.viewBox
          .split(/\s*,*\s|\s,*\s*|,/)
          .map(value => parseFloat(value))
          : [0, 0, 0, 0];
        [x, y] = vb;
        w = 'width' in tag.attributes ? parseFloat(tag.attributes.width) : vb[2];
        h = 'height' in tag.attributes ? parseFloat(tag.attributes.height) : vb[3];
        break;
      case 'rect':
        if (tag.attributes.fill !== 'none') paths.push(shapeToPath.rect(tag.attributes));
        break;
      case 'line':
        if (tag.attributes.fill !== 'none') paths.push(shapeToPath.line(tag.attributes));
        break;
      case 'polyline':
        if (tag.attributes.fill !== 'none') paths.push(shapeToPath.polyline(tag.attributes));
        break;
      case 'polygon':
        if (tag.attributes.fill !== 'none') paths.push(shapeToPath.polygon(tag.attributes));
        break;
      case 'circle':
      case 'ellipse':
        if (tag.attributes.fill !== 'none') paths.push(shapeToPath.circle(tag.attributes));
        break;
      case 'path':
        if (tag.attributes.d && tag.attributes.fill !== 'none') paths.push(tag.attributes.d);
        break;
      default:
    }
  });

  sax.on('end', () => {
    d = svgpath(paths.join(' '))
      .translate(-x, -y)
      .scale(STANDARD_WIDTH / w, STANDARD_HEIGHT / h)

      .matrix([1, 0, 0, -1, 0, 1024])
      .translate(0, FONT_DESCENT)

      .rel()
      .round(STANDARD_ROUND)
      .toString();
  });

  sax.write(buffer);
  sax.end();

  return d;
};
