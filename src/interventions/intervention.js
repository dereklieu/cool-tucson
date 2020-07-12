'use strict';
import React from 'react';
import ReactTooltip from 'react-tooltip'
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
    score,
    dragType
  } = props;

  const isFielded = dragType === constants.FIELDED_INTERVENTION;

  const [{ isDragging }, drag] = useDrag({
    item: { id, name, score, type: dragType },
    begin: () => ReactTooltip.hide(),
    collect
  });

  // Hide placed interventions when they are being dragged
  if (isDragging && isFielded) {
    return null;
  }

  const dimension = isFielded ? 'auto' : 90;

  const containerStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
    lineHeight: px(dimension),
    width: px(dimension),
    height: px(dimension),
    verticalAlign: 'middle'
  };

  const containerClass = c(
    'align-center',
    {
      'round-full bg-gray-faint': !isFielded
    }
  );

  const displayName = parseName(name);

  return (
    <div ref={drag} className={containerClass} style={containerStyle}>
      <strong>{displayName}</strong>
    </div>
  );
};
