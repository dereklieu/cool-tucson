'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';
import { IconLabel } from '../indicators/icon-label';

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging()
  };
}

export const Intervention = (props) => {
  const { id, icon, type } = props;

  const [{ isDragging }, drag] = useDrag({
    item: { id, type },
    collect
  });

  const containerStyle = {
    cursor: isDragging ? 'grabbing' : 'grab'
  };

  return (
    <div ref={drag} className="px12 py12" style={containerStyle}>
      <IconLabel icon={icon} size={36} />
    </div>
  );
};
