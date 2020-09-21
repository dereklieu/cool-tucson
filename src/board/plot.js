'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import constants from '../constants';

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

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: constants.NEW_INTERVENTION,
    drop: ({ id, name, score }) => {
      return applyIntervention(id, name, score, row, column);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    })
  });

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
    <div
      className="absolute scroll-hidden"
      style={containerStyle}
      ref={drop}
    >
    </div>
  );
}
