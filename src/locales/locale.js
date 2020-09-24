'use strict';
import React from 'react';
import c from 'classnames';
import { px } from '../util/style-util';

import sprites from '../assets/img/sprites/locales/spritesheet.json';
import sprite from '../assets/img/sprites/locales/spritesheet.png';

const SPRITE_SIZE = sprites.meta.size;

const types = {
  hd: 'el-houslanta.png',
  hh: 'las-albusconix.png',
  t: 'san-porteattlopolis.png'
};

export const Locale = (props) => {
  const { onClick, size, type, isStatic } = props;

  const { frame } = sprites.frames[types[type]];

  const scale = size / frame.w;
  const backgroundSize = `${px(SPRITE_SIZE.w * scale)} ${px(SPRITE_SIZE.h * scale)}`;
  const backgroundPosition = `-${px(frame.x * scale)} -${px(frame.y * scale)}`;
  const imageStyle = {
    width: px(size),
    height: px(size),
    backgroundImage: `url('${sprite}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition,
    backgroundSize
  };

  const containerClass = c({
    'cursor-pointer saturate-on-hover': !isStatic
  });

  return (
    <div className={containerClass} onClick={() => onClick(type)}>
      <div style={imageStyle} />
    </div>
  );
};
