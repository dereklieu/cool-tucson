'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { px, vw } from '../util/style-util';

import { interventionSelectors } from '../store/intervention-selectors';

// import { Plot } from './plot';
// import { positions } from './positions';

import { Plot } from './plot-svg';
import { positions } from './positions-svg';

import constants from '../constants';
import board from '../assets/img/board/board.svg';

const boardStyle = {
  width: vw(100),
  height: vw(100 * constants.HEIGHT_RATIO)
};

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
    const { containerWidth } = this.state;
    if (containerWidth === null) return null;

    return (
      <div key={position.id}>
        <Plot containerWidth={containerWidth} type={position.type} position={position} />
      </div>
    );
  };

  render() {
    const { dragging } = this.props;
    const { containerWidth, containerHeight } = this.state;
    const svgStyle = {
      width: px(containerWidth),
      height: px(containerHeight)
    };
    const svgClassName = c(
      'icon absolute',
      {
        'opacity50': !!dragging
      }
    );
    return (
      <div className="relative scroll-hidden" style={boardStyle} ref={this.container}>
        <svg className={svgClassName} style={svgStyle}><use xlinkHref={`#${board.id}`} /></svg>
        {positions.map(this.renderPosition)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dragging: interventionSelectors.dragging(state)
});

const mapDispatch = {
};

Board = connect(
  mapStateToProps,
  mapDispatch
)(Board);

export { Board };
