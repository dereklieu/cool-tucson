'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { pixel } from '../util/style-util';

export function Cell (props) {
  const { height } = props;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'INTERVENTION',
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  });

  const containerClass = c('w-full', {
    'border border--gray': isOver,
    'border border--gray-light': canDrop && !isOver
  });

  return (
    <div
      className={containerClass}
      style={{ height: pixel(height / 2), borderRadius: '50%' }}
      ref={drop}
    />
  );
}
