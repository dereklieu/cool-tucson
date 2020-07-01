'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';

const type = 'INTERVENTION';

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging()
  };
}

export const Intervention = (props) => {
  const { id } = props;

  const [{ isDragging }, drag] = useDrag({
    item: { id, type },
    collect
  });

  const containerStyle = {
    cursor: isDragging ? 'grabbing' : 'grab'
  };

  return (
    <div ref={drag} className="px12 py12" style={containerStyle}>
      <svg className="icon w36 h36"><use xlinkHref={`#icon-${id}`} /></svg>
    </div>
  );
};
