'use strict';
import c from 'classnames';

export const px = (number) => Math.floor(number) + 'px';
export const pct = (number) => number + '%';
export const vw = (number) => number + 'vw';

export const pillClass = (type) => {
  return c(
    'round px6 py3 color-white txt-bold',
    {
      'bg-blue': type === 'Private buildings',
      'bg-purple': type === 'Town hall',
      'bg-green': type === 'Open area',
      'bg-gray': type === 'Street',
      'bg-black': type === '$'
    }
  );
}
