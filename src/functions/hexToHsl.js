export const _hexToHsl = (hexStr) => {
  let c, r, g, b, result;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexStr)) {
    c = hexStr.substring(1).split('');

    if (c.length == 3) {
      result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hexStr);

      r = parseInt(result[1] + result[1], 16);
      g = parseInt(result[2] + result[2], 16);
      b = parseInt(result[3] + result[3], 16);
    } else {
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);

      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
    }

    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }
  throw new Error('Value is not a valid hex code');
}
