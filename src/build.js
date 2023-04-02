import StyleDictionary from 'style-dictionary';
import config from './config.js';
import { _hexToHsl } from './functions/hexToHsl.js';
import { _hexToRgba } from './functions/hexToRgba.js';
import { _normalizeUnits } from './functions/normalizeUnits.js';
import _ from 'lodash';

console.log('Build started...');
console.log('\n==============================================');

StyleDictionary.registerTransform({
  name: 'name/kebab/color',
  type: 'name',
  matcher: (token) => {
    return token.type === 'color';
  },
  transformer: (token, options) => {
    const name = token.name.split('-');
    if (name[0] === 'base' && name[1] !== 'black' && name[1] !== 'white') {
      return `${name[1].charAt(0)}-${name[2]}`;
    }
    return _.kebabCase( [options.prefix].concat(token.path.slice(1, token.path.length)).join('-') );
  }
});

StyleDictionary.registerTransform({
  name: 'name/kebab/ti',
  type: 'name',
  matcher: (token) => {
    return token.type !== 'color';
  },
  transformer: (token) => {
    const name = token.name.split('-');
    name.shift();
    if (name[0] === 'body' || name[0] === 'heading') {
      name.shift();

      if (token.type === 'typography')
        name.unshift('font');
    }
    return name.join('-');
  }
});

StyleDictionary.registerTransform({
  name: 'name/camel/color',
  type: 'name',
  matcher: (token) => {
    return token.type === 'color';
  },
  transformer: (token, options) => {
    const name = token.name.split(/(?=[A-Z])/);
    if (name[0] === 'Base' && name[1] !== 'Black' && name[1] !== 'White') {
      const abbr = name[1].match(/[a-zA-Z]+/g)[0].charAt(0).toLowerCase(),
        num = name[1].match(/\d+/g);
      return `${abbr}${num}`;
    }
    return _.camelCase( [options.prefix].concat(token.path.slice(1, token.path.length)).join('-') );
  }
});

StyleDictionary.registerTransform({
  name: 'name/camel/ti',
  type: 'name',
  matcher: (token) => {
    return token.type !== 'color';
  },
  transformer: (token) => {
    const name = token.name.split(/(?=[A-Z])/);
    name.shift();
    if (name[0] === 'Body' || name[0] === 'Heading') {
      name.shift();

      if (token.type === 'typography')
        name.unshift('font');
    }
    return _.camelCase( name );
  }
});

StyleDictionary.registerTransform({
  name: 'value/quotes',
  type: 'value',
  matcher: (token) => {
    return token.type === 'fontFamilies';
  },
  transformer: (token) => {
    return `"${token.value}"`;
  }
});

StyleDictionary.registerTransform({
  name: 'color/hexHsl',
  type: 'value',
  matcher: (token) => {
    return token.type === 'color';
  },
  transformer: (token) => {
    return _hexToHsl(token.value);
  }
});

StyleDictionary.registerTransform({
  name: 'shadows/hexRgba',
  type: 'value',
  matcher: (token) => {
    return token.type === 'boxShadow';
  },
  transformer: (token) => {
    const shadows = token.value.split(', ');
    let updatedShadow;
    shadows.forEach(shadow => {
      let [x, y, blur, spread, color] = shadow.split(' ');
      color = _hexToRgba(color);
      if (updatedShadow) {
        updatedShadow = `${updatedShadow}, ${x} ${y} ${blur} ${spread} ${color}`;
      } else {
        updatedShadow = `${x} ${y} ${blur} ${spread} ${color}`;
      }
    });
    return updatedShadow;
  }
});

StyleDictionary.registerTransform({
  name: 'size/pxRem',
  type: 'value',
  matcher: (token) => {
    return token.type === 'fontSizes';
  },
  transformer: (token) => {
    return _normalizeUnits(token.value, 'px', 'rem');
  }
});

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup['scss'].concat([
    'name/kebab/color',
    'name/kebab/ti',
    'value/quotes',
    'color/hexHsl',
    'shadows/hexRgba',
    'size/pxRem'
  ])
});

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['css'].concat([
    'name/kebab/color',
    'name/kebab/ti',
    'value/quotes',
    'color/hexHsl',
    'shadows/hexRgba',
    'size/pxRem'
  ])
});

StyleDictionary.registerTransformGroup({
  name: 'custom/js',
  transforms: StyleDictionary.transformGroup['js'].concat([
    'name/camel/color',
    'name/camel/ti',
    'value/quotes',
    'color/hexHsl',
    'shadows/hexRgba',
    'size/pxRem'
  ])
});

const StyleDictionaryExtended = StyleDictionary.extend(config);

StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');
