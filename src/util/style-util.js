'use strict';
import React from 'react';
import c from 'classnames';
import constants from '../constants';

export const px = (number) => Math.floor(number) + 'px';
export const pct = (number) => number + '%';
export const vw = (number) => number + 'vw';
export const vh = (number) => number + 'vh';
export const x = (width) => width / constants.BOARD_NATIVE_WIDTH;
export const y = (height) => height / constants.BOARD_NATIVE_HEIGHT * constants.HEIGHT_RATIO;

const interventionColor = {
  'Private buildings': 'bg-blue',
  'Town hall': 'bg-purple',
  'Open area': 'bg-green',
  'Street': 'bg-gray',
  '$': 'bg-black'
};

const interventionHoverColor = {
  'Private buildings': 'bg-blue-faint bg-blue-on-hover',
  'Town hall': 'bg-purple-faint bg-purple-on-hover',
  'Open area': 'bg-green-faint bg-green-on-hover',
  'Street': 'bg-darken10 bg-gray-on-hover',
  '$': 'bg-black'
};

export const getInterventionColor = (type, hover) => {
  return hover ? interventionHoverColor[type] : interventionColor[type];
};

export const pillClass = (type) => {
  return c(
    'round px6 py3 color-white txt-bold',
    getInterventionColor(type, false)
  );
};

export const colorText = (text, color) => <span className={c('txt-bold', color)}>{text}</span>;

export const bgColor = (type) => interventionColor[type] + '-faint';

const stops = [
  15,
  50,
  150,
  Infinity
]
export const formatCost = (cost) => {
  if (cost <= 0) return 'Free';
  const i = stops.findIndex(stop => cost <= stop);
  return [...new Array(i + 1)].map(() => '$').join('');
};

export const isHDPR = () => window.devicePixelRatio > 1;
