import SVGO from 'svgo';
import { mergeRight } from 'ramda';
import { base } from './base';

export const generalConfig: SVGO.Options = mergeRight(base, {
  plugins: [
    ...(base.plugins || []),
    { removeAttrs: { attrs: ['class'] } },
    { addAttributesToSVGElement: { attributes: [{
      height: '1em',
      width: '1em'
    }]} },
    { convertColors: { currentColor: true } }
  ]
});
