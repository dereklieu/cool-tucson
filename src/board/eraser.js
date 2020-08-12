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

export const Eraser = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: constants.ERASER,
      type: constants.ERASER
    },
    collect
  });

  const { className } = props;
  const containerClass = c(
    className,
    'w60 h60 border color-orange',
    'align-center align-middle'
  );

  const cursor = isDragging ? 'grabbing' : 'grab';

  const containerStyle = {
    cursor,
    lineHeight: px(60)
  };

  return (
    <div
      ref={drag}
      className={containerClass}
      style={containerStyle}
      data-tip={constants.ERASER}
    >
      <IconLabel icon="return" size={24} className="inline-block" />
    </div>


  );
};
