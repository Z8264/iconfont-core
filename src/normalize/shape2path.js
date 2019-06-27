

function rect(attributes) {
  const x = typeof attributes.x !== 'undefined' ? parseFloat(attributes.x) : 0;
  const y = typeof attributes.y !== 'undefined' ? parseFloat(attributes.y) : 0;
  const width = typeof attributes.width !== 'undefined' ? parseFloat(attributes.width) : 0;
  const height = typeof attributes.height !== 'undefined'
    ? parseFloat(attributes.height)
    : 0;
  const rx = typeof attributes.rx !== 'undefined' ? parseFloat(attributes.rx) : 0;
  const ry = typeof attributes.ry !== 'undefined' ? parseFloat(attributes.ry) : 0;

  return (
    `${''
    + 'M'}${
      x + rx
    } ${
      y
    }h${
      width - rx * 2
    }${rx || ry ? `a ${rx} ${ry} 0 0 1 ${rx} ${ry}` : ''
    }v${
      height - ry * 2
    }${rx || ry ? `a ${rx} ${ry} 0 0 1 ${rx * -1} ${ry}` : ''
    }h${
      (width - rx * 2) * -1
    }${rx || ry
      ? `a ${rx} ${ry} 0 0 1 ${rx * -1} ${ry * -1}`
      : ''
    }v${
      (height - ry * 2) * -1
    }${rx || ry ? `a ${rx} ${ry} 0 0 1 ${rx} ${ry * -1}` : ''
    }z`
  );
}

function polyline(attributes) {
  return `M${attributes.points}`;
}

function line(attributes) {
  return (
    `${''
    + 'M'}${
      (parseFloat(attributes.x1) || 0).toString(10)
    } ${
      (parseFloat(attributes.y1) || 0).toString(10)
    } ${
      ((parseFloat(attributes.x1) || 0) + 1).toString(10)
    } ${
      ((parseFloat(attributes.y1) || 0) + 1).toString(10)
    } ${
      ((parseFloat(attributes.x2) || 0) + 1).toString(10)
    } ${
      ((parseFloat(attributes.y2) || 0) + 1).toString(10)
    } ${
      (parseFloat(attributes.x2) || 0).toString(10)
    } ${
      (parseFloat(attributes.y2) || 0).toString(10)
    }Z`
  );
}

function circle(attributes) {
  const cx = parseFloat(attributes.cx);
  const cy = parseFloat(attributes.cy);
  const rx = typeof attributes.rx !== 'undefined'
    ? parseFloat(attributes.rx)
    : parseFloat(attributes.r);
  const ry = typeof attributes.ry !== 'undefined'
    ? parseFloat(attributes.ry)
    : parseFloat(attributes.r);

  return (
    `${''
    + 'M'}${
      cx - rx
    },${
      cy
    }A${
      rx
    },${
      ry
    } 0,0,0 ${
      cx + rx
    },${
      cy
    }A${
      rx
    },${
      ry
    } 0,0,0 ${
      cx - rx
    },${
      cy}`
  );
}

function polygon(attributes) {
  return `M${attributes.points}Z`;
}

module.exports = {
  rect, polyline, line, circle, polygon,
};
