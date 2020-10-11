'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import { ActiveIntervention } from './active-intervention';

import { interventionSelectors } from '../store/intervention-selectors';
import { boardActionCreators } from '../store/board-action-creators';
import { boardSelectors } from '../store/board-selectors';

import { px, x, y } from '../util/style-util';
import constants from '../constants';

let Plot = (props) => {
  const {
    activeType,
    activeIntervention,
    appliedInterventions,
    applyIntervention,

    containerWidth,
    plot,
    type,
    position
  } = props;

  const isActiveType = type === activeType;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [
      constants.NEW_INTERVENTION,
      constants.ERASER
    ],
    canDrop: ({ name }) => {
      // Eraser can apply on any plot that has applied interventions.
      if (name === constants.ERASER) {
        if (appliedInterventions.length) return true;
        return false;
      }

      const hasPrereq = !constants.INTERVENTION_PREREQUISITES[name] ||
        appliedInterventions.includes(constants.INTERVENTION_PREREQUISITES[name]);

      return hasPrereq &&
        isActiveType &&
        !appliedInterventions.includes(name);
    },
    drop: ({ name }) => {
      applyIntervention(plot, name);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  });

  const isDragging = Boolean(activeIntervention);
  const containerClass = c(
    'absolute',
    {
      'opacity100': !isDragging || canDrop,
      'opacity25': isDragging && !canDrop
    }
  );

  const { svg, placement } = position;

  const width = px(x(svg.w) * containerWidth);
  const height = px(y(svg.h) * containerWidth);
  const left = px(x(placement.x) * containerWidth);
  const top = px(y(placement.y) * containerWidth);
  let zIndex = 1;

  if (isActiveType) { zIndex += 10; }
  if (canDrop) { zIndex += 5; }
  if (activeIntervention === constants.ERASER && appliedInterventions.length) {
    zIndex += 5;
  }

  const containerStyle = {
    top,
    left,
    width,
    height,
    zIndex
  };

  const interventions = appliedInterventions.map(name => ({
    ...position.interventions[name],
    name
  }));

  // Render a preview of the intervention
  if (isDragging && canDrop && position.interventions[activeIntervention]) {
    interventions.push({
      ...position.interventions[activeIntervention],
      name: activeIntervention,
      isPreview: true
    });
  }

  const ratio = containerWidth / constants.BOARD_NATIVE_WIDTH;

  return (
    <div
      className={containerClass}
      style={containerStyle}
      ref={drop}
    >
      <div className="relative">
        {interventions.filter(i => i.post).map(i => (
          <ActiveIntervention
            intervention={i}
            key={`${i.name}-${i.isPreview ? 'preview' : 'applied'}`}
            ratio={ratio}
            isPreview={i.isPreview}
          />
        ))}

        <svg
          className="icon absolute"
          style={{ width, height }}
        >
          <use xlinkHref={`#${svg.id}`} />
        </svg>

        {interventions.filter(i => !i.post).map(i => (
          <ActiveIntervention
            intervention={i}
            key={`${i.name}-${i.isPreview ? 'preview' : 'applied'}`}
            ratio={ratio}
            isPreview={i.isPreview}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  activeType: interventionSelectors.draggedType(state),
  activeIntervention: interventionSelectors.dragging(state),
  appliedInterventions: boardSelectors.interventions(state, props)
});

const mapDispatch = {
  applyIntervention: boardActionCreators.applyIntervention
};

Plot = connect(
  mapStateToProps,
  mapDispatch
)(Plot);

export { Plot };
