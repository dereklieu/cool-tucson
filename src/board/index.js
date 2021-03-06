'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { px, vw } from '../util/style-util';

import { interventionSelectors } from '../store/intervention-selectors';
import { boardSelectors } from '../store/board-selectors';

import { Plot } from './plot-svg';
import { positions } from './positions-svg';

import constants from '../constants';
import board from '../assets/img/board/board.svg';
import boardTemperate from '../assets/img/board/board-temperate.svg';
import boardHotDry from '../assets/img/board/board-hot-dry.svg';
import boardHotHumid from '../assets/img/board/board-hot-humid.svg';

let Board = class Board extends React.PureComponent {
  getBoardDimensions = () => {
    const { containerWidth, containerHeight } = this.props;
    if (!containerWidth || !containerHeight) return { width: 0, height: 0 };

    // Detect long skinny views, aka upright mobile
    if (containerHeight / containerWidth >= 1.8) {
      return {
        width: containerHeight / 2 / constants.HEIGHT_RATIO,
        height: containerHeight / 2
      };
    }

    return {
      width: containerWidth,
      height: containerWidth * constants.HEIGHT_RATIO
    };
  };

  renderPosition = (position) => {
    // Nope out until second render when we've synced position
    const { width } = this.getBoardDimensions();
    if (!width) return null;

    return (
      <div key={position.id}>
        <Plot
          containerWidth={width}
          plot={position.id}
          type={position.type}
          position={position}
        />
      </div>
    );
  };

  render() {
    const { dragging, locale } = this.props;
    const { width, height } = this.getBoardDimensions();

    const svgStyle = {
      width: px(width),
      height: px(height)
    };

    const containerStyle = {
      overflowY: 'hidden',
      overflowX: 'auto'
    };

    const svgClassName = c(
      'icon absolute',
      {
        'opacity50': !!dragging
      }
    );

    let boardSvgId;
    switch (locale) {
      case 't':
        boardSvgId = boardTemperate.id;
        break;
      case 'hd':
        boardSvgId = boardHotDry.id;
        break;
      case 'hh':
        boardSvgId = boardHotHumid.id;
        break;
      default:
        boardSvgId = board.id;
        break;
    }

    return (
      <div className="pt60" style={containerStyle}>
        <div className="relative" style={svgStyle}>
          <svg className={svgClassName} style={svgStyle}><use xlinkHref={`#${boardSvgId}`} /></svg>
          {positions.map(this.renderPosition)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dragging: interventionSelectors.dragging(state),
  locale: boardSelectors.locale(state)
});

Board = connect(mapStateToProps)(Board);

export { Board };
