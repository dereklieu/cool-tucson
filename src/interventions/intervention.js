'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';
import c from 'classnames';
import { IconLabel } from '../indicators/icon-label';
import constants from '../constants';
import { px } from '../util/style-util';

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
    id,
    name,
    isActive,
    changeActiveIntervention,
    score,
    dragType
  } = props;

  const isFielded = dragType === constants.FIELDED_INTERVENTION;

  const isDraggable = isFielded || isActive;

  const [{ isDragging }, drag] = useDrag({
    item: { id, name, score, type: dragType },
    canDrag: () => isDraggable,
    collect
  });

  // Hide placed interventions when they are being dragged
  if (isDragging && isFielded) {
    return null;
  }

  const dimension = isFielded ? 'auto' : 90;

  let cursor;
  if (isDraggable) {
    cursor = isDragging ? 'grabbing' : 'grab';
  } else {
    cursor = 'pointer';
  }

  const containerStyle = {
    cursor,
    lineHeight: px(dimension),
    width: px(dimension),
    height: px(dimension),
    verticalAlign: 'middle'
  };

  const containerClass = c(
    'align-center',
    {
      'round-full bg-gray-faint': !isFielded,
      'border': isActive,
      'color-gray-light': !isDraggable
    }
  );

  const displayName = parseName(name);
  const setActive = () => {
    if (changeActiveIntervention) {
      changeActiveIntervention(id);
    }
  };

  return (
    <div
      ref={drag}
      className={containerClass}
      style={containerStyle}
      onClick={setActive}
    >
      <strong>{displayName}</strong>
    </div>
  );
};
