'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import { interventionSelectors } from '../store/intervention-selectors';

import { px, vw } from '../util/style-util';
import constants from '../constants';

const x = (w) => w / constants.BOARD_NATIVE_WIDTH;
const y = (h) => h / constants.BOARD_NATIVE_HEIGHT * constants.HEIGHT_RATIO;

let Plot = (props) => {
  const {
    containerWidth,
    type,
    position,
    activeType
  } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: constants.NEW_INTERVENTION,
    drop: ({ id, name, score }) => {
      // return applyIntervention(id, name, score, row, column);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    })
  });

  const isDragging = Boolean(activeType);
  const isActiveType = type === activeType;
  const containerClass = c(
    {
      'opacity100': !isDragging || isActiveType,
      'opacity25': isDragging && !isActiveType
    }
  );

  const { svg, placement } = position;

  const width = vw(x(svg.w) * 100);
  const height = vw(y(svg.h) * 100);
  const left = vw(x(placement.x) * 100);
  const top = vw(y(placement.y) * 100);

  const svgStyle = {
    width,
    height,
    left,
    top
  }

  return (
    <div
      className={containerClass}
      ref={drop}
    >
      <svg className="icon absolute" style={svgStyle}><use xlinkHref={`#${svg.id}`} /></svg>
    </div>
  );
};

const mapStateToProps = state => ({
  activeType: interventionSelectors.draggedType(state)
});

Plot = connect(
  mapStateToProps
)(Plot);

export { Plot };
