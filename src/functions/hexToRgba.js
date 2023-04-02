export const _hexToRgba = (hexStr) => {
  let c;

  if (/^#([A-Fa-f0-9]{8}){1}$/.test(hexStr)) {
      c = hexStr.substring(1).split('');
      c = '0x' + c.join('');

      return 'rgba('+[(c>>24)&255, (c>>16)&255, (c>>8)&255, parseFloat(c/255).toFixed(2)].join(',')+')';
  }
  throw new Error('Value is not a valid 8 digit hex code');
}
