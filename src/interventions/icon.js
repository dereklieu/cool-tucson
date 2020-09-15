'use strict';
import React from 'react';
import { px } from '../util/style-util';

import sprite from '../assets/img/sprites/interventions/spritesheet.png';
import sprites from '../assets/img/sprites/interventions/spritesheet.json';

const SPRITE_SIZE = sprites.meta.size;

const getSpriteMeta = (intervention, type) => {
  const prefix = type
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0))
    .join('');
  const name = intervention.toLowerCase().split(' ').join('-');
  const key = `${prefix}-${name}.png`;
  const sprite = sprites.frames[key];
  if (!sprite) throw new Error(`Sprite ${key} not found in spritesheet`);
  return sprite;
};

export const Icon = (props) => {
  const {
    size,
    name,
    type
  } = props;

  const meta = getSpriteMeta(name, type);
  const { frame } = meta;

  // Sprites must be square, and dimensions must be
  // even multiples of props.size.
  const scale = size / frame.w;

  const backgroundSize = `${px(SPRITE_SIZE.w * scale)} ${px(SPRITE_SIZE.h * scale)}`;
  const backgroundPosition = `-${px(frame.x * scale)} -${px(frame.y * scale)}`;
  const containerStyle = {
    width: px(size),
    height: px(size),
    backgroundImage: `url('${sprite}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition,
    backgroundSize
  };
  return (
    <div style={containerStyle} />
  );
};
