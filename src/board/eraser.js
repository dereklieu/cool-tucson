'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import c from 'classnames';
import ReactTooltip from 'react-tooltip';

import { boardSelectors } from '../store/board-selectors';
import { interventionActionCreators } from '../store/intervention-action-creators';

import { IconLabel } from '../indicators/icon-label';
import constants from '../constants';
import { px } from '../util/style-util';

import bulldozer from '../assets/img/svg/interventions/bulldozer.svg';

const collect = (monitor) => {
  return {
    canDrag: monitor.canDrag(),
    isDragging: monitor.isDragging()
  };
}

let Eraser = (props) => {
  const {
    className,
    hasInterventions,
    dragIntervention
  } = props;

  const [{ canDrag, isDragging }, drag] = useDrag({
    canDrag: () => hasInterventions,
    begin: () => {
      ReactTooltip.hide();
      dragIntervention(constants.ERASER);
    },
    end: () => {
      dragIntervention(null);
    },
    item: {
      name: constants.ERASER,
      type: constants.ERASER
    },
    collect
  });

  const size = 80;
  const eraserClass = c(className, {
    'opacity50': !canDrag
  });
  const cursor = isDragging ? 'grabbing' : 'grab';
  const eraserStyle = {
    width: px(size),
    height: px(size),
    cursor
  };

  if (!hasInterventions) {
    eraserStyle.filter = 'grayscale(100%)';
  }

  return (
    <div
      className="mx3 my3 bg-transparent"
      data-tip={constants.ERASER}
    >
      <div
        ref={drag}
        className={eraserClass}
        style={eraserStyle}
      >
        <svg className="icon" style={eraserStyle}>
          <use xlinkHref={`#${bulldozer.id}`} />
        </svg>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  hasInterventions: boardSelectors.hasInterventions(state)
});
const mapDispatch = {
  dragIntervention: interventionActionCreators.dragIntervention
};
Eraser = connect(mapStateToProps, mapDispatch)(Eraser);
export { Eraser }
