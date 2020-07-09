'use strict';
import c from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import { boardActionCreators } from '../store/board-action-creators';
import constants from '../constants';

let Bin = props => {
  const {
    className,
    children,
    removeIntervention
  } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: constants.FIELDED_INTERVENTION,
    drop: ({ id, score }) => {
      return removeIntervention(id, score);
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  console.log(canDrop, isOver)
  const classes = c(className, {
    'bg-orange-faint': canDrop && !isOver,
    'bg-orange-light': isOver
  });

  return (
    <div className={classes} ref={drop}>
      {children}
    </div>
  );
};

const mapDispatch = {
  removeIntervention: boardActionCreators.removeIntervention
};

Bin = connect(null, mapDispatch)(Bin);

export { Bin }
