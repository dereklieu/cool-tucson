'use strict';
import React from 'react';
import ReactTooltip from 'react-tooltip'
import { useDrag } from 'react-dnd';
import { IconLabel } from '../indicators/icon-label';

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging()
  };
}

const parseName = name =>
  name.split(' ')
    .map(word =>
      word === 'and' ? '&' : word.charAt(0).toUpperCase()
    )
    .join('');

export const Intervention = (props) => {
  const {
    name,
    score,
    dragType
  } = props;

  const id = parseName(name);

  const [{ isDragging }, drag] = useDrag({
    item: { name, score, type: dragType },
    begin: () => ReactTooltip.hide(),
    collect
  });

  const containerStyle = {
    cursor: isDragging ? 'grabbing' : 'grab'
  };

  return (
    <div ref={drag} className="px12 py12 wmin60 align-center" style={containerStyle}>
      <strong>{id}</strong>
    </div>
  );
};
