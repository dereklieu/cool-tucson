'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { px, pct, vw } from '../util/style-util';

import { boardSelectors } from '../store/board-selectors';
import { scoreSelectors } from '../store/score-selectors';
import { boardActionCreators } from '../store/board-action-creators';

import { Plot } from './plot';
import { positions } from './positions';

import board from '../assets/img/board/board.png';
import sprites from '../assets/img/sprites/board/spritesheet.json';

const SPRITE_SIZE = sprites.meta.size;

const BOARD_NATIVE_WIDTH = 2000;
const BOARD_NATIVE_HEIGHT = 740;

const HEIGHT_RATIO = BOARD_NATIVE_HEIGHT / BOARD_NATIVE_WIDTH;

const boardStyle = {
  width: vw(100),
  height: vw(100 * HEIGHT_RATIO),
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundImage: `url('${board}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

const x = (w) => w / BOARD_NATIVE_WIDTH;
const y = (h) => h / BOARD_NATIVE_HEIGHT * HEIGHT_RATIO;

let Board = class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      containerWidth: null,
      containerHeight: null
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.syncDimensions);
    this.syncDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.syncDimensions);
  }

  syncDimensions = () => {
    const dimensions = this.container.current.getBoundingClientRect();
    this.setState({
      containerWidth: dimensions.width,
      containerHeight: dimensions.height
    });
  };

  renderPosition = (position) => {
    // Nope out until second render when we've synced position
    const { containerWidth, containerHeight } = this.state;
    if (containerWidth === null) return null;

    const { sprite, placement } = position;

    const width = vw(x(sprite.w) * 100);
    const height = vw(y(sprite.h) * 100);
    const left = vw(x(placement.left) * 100);
    const top = vw(y(placement.top) * 100);

    const scale = containerWidth / BOARD_NATIVE_WIDTH;

    const backgroundSize = `${px(SPRITE_SIZE.w * scale)} ${px(SPRITE_SIZE.h * scale)}`;
    const backgroundPosition = `-${px(sprite.x * scale)} -${px(sprite.y * scale)}`;

    const props = { width, height, left, top, backgroundPosition, backgroundSize };

    return (
      <div key={position.id}>
        <Plot {...props} />
      </div>
    );
  };

  render() {
    return (
      <div className="relative scroll-hidden" style={boardStyle} ref={this.container}>
        {positions.map(this.renderPosition)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cells: boardSelectors.cells(state),
  interventionType: boardSelectors.interventionType(state),
  currency: scoreSelectors.currency(state)
});

const mapDispatch = {
  applyIntervention: boardActionCreators.applyIntervention
};

Board = connect(
  mapStateToProps,
  mapDispatch
)(Board);

export { Board };
