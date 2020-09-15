'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

import sprite from '../assets/img/sprites/board/spritesheet.png';

export function Plot (props) {

  const {
    width,
    height,
    left,
    top,
    backgroundSize,
    backgroundPosition
  } = props;

  const containerStyle = {
    width,
    height,
    left,
    top,
    backgroundImage: `url('${sprite}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize,
    backgroundPosition
  }

  return (
    <div className="absolute scroll-hidden" style={containerStyle}>

    </div>
  );
}
