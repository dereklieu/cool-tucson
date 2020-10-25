'use strict';
import React from 'react';
import { connect } from 'react-redux';
import c from 'classnames';

import { scoreSelectors } from '../store/score-selectors';
import { px } from '../util/style-util';
import constants from '../constants';

const markerStyle = { right: px(-56) };

const Fire = () => (
  <div className="absolute txt-xl cursor-default" style={markerStyle}>🔥</div>
);

const Ice = () => (
  <div className="absolute txt-xl bottom mb-neg24 cursor-default" style={markerStyle}>❄️</div>
);

let Thermometer = (props) => {
  const { social, environmental } = props;
  const score = social + environmental;
  const max = 30;
  const height = 200;
  const progress = (max - score) / max;
  const indicator = constants.WIN_SCORE / max;

  const heightStyle = { height: px(height), zIndex: 100 };

  const containerClass = c('absolute bg-white');
  const containerStyle = {
    border: '3px solid #333',
    borderBottom: 'none',
    borderTopRightRadius: px(999),
    borderTopLeftRadius: px(999),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: 2
  };

  const circleClass = c('absolute round-full bg-white');
  const circleStyle = {
    border: '3px solid #333',
    width: px(40),
    height: px(40),
    left: px(-8),
    bottom: px(-49),
    zIndex: 1
  };

  const outerBarClass = c(
    'relative my6 mx6 w6 round-full bg-gray-light'
  );
  const outerBarStyle = { height: px(height) };

  const r = progress * 255;
  const b = 255 - (progress * 255);
  const color = `rgb(${r}, 0, ${b})`;

  const innerBarClass = c(
    'absolute bottom w6 round-full transition'
  );
  const innerBarStyle = {
    background: color,
    height: px(progress * (height + 20)),
    marginBottom: px(-20),
  };

  const indicatorStyle = {
    borderBottom: '1px solid black',
    borderTop: '1px solid white',
    left: px(-12),
    height: px(1),
    top: px(indicator * (height + 20))
  }

  const innerCircleClass = c('absolute round-full w24 h24');
  const innerCircleStyle = {
    background: color,
    bottom: px(-40),
    zIndex: 3
  };

  return (
    <div className="relative" style={heightStyle}>
      <div className={circleClass} style={circleStyle} />
      <div className={containerClass} style={containerStyle}>
        <div className={outerBarClass} style={outerBarStyle}>
          <div className={innerBarClass} style={innerBarStyle} />
          <div className="absolute w36" style={indicatorStyle} />
        </div>
      </div>
      <div className={innerCircleClass} style={innerCircleStyle} />
      <Fire />
      <Ice />
    </div>
  );
};

const mapStateToProps = state => ({
  social: scoreSelectors.social(state),
  environmental: scoreSelectors.environmental(state)
});

Thermometer = connect(mapStateToProps)(Thermometer);
export { Thermometer };
