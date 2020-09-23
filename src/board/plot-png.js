'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import { interventionSelectors } from '../store/intervention-selectors';
import { boardActionCreators } from '../store/board-action-creators';

import { px, vw } from '../util/style-util';
import constants from '../constants';

import spritesheet from '../assets/img/sprites/board/spritesheet.png';
import sprites from '../assets/img/sprites/board/spritesheet.json';

const SPRITE_SIZE = sprites.meta.size;

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
    drop: ({ name, score }) => {
      applyIntervention(position.id, name, score);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    })
  });

  const isDragging = Boolean(activeType);
  const isActiveType = type === activeType;
  const containerClass = c(
    'absolute scroll-hidden',
    {
      'opacity100': !isDragging || isActiveType,
      'opacity25': isDragging && !isActiveType
    }
  );

  const { sprite, placement } = position;

  const width = vw(x(sprite.w) * 100);
  const height = vw(y(sprite.h) * 100);
  const left = vw(x(placement.x) * 100);
  const top = vw(y(placement.y) * 100);

  const scale = containerWidth / constants.BOARD_NATIVE_WIDTH;

  const backgroundSize = `${px(SPRITE_SIZE.w * scale)} ${px(SPRITE_SIZE.h * scale)}`;
  const backgroundPosition = `-${px(sprite.x * scale)} -${px(sprite.y * scale)}`;

  const containerStyle = {
    width,
    height,
    left,
    top,
    backgroundImage: `url('${spritesheet}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize,
    backgroundPosition
  }

  return (
    <div
      className={containerClass}
      style={containerStyle}
      ref={drop}
    >
    </div>
  );
};

const mapStateToProps = state => ({
  activeType: interventionSelectors.draggedType(state)
});

const mapDispach = {
  applyIntervention: boardActionCreators.applyIntervention
};

Plot = connect(
  mapStateToProps,
  mapDispach
)(Plot);

export { Plot };
