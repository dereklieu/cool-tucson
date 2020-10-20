'use strict';
import React from 'react';
import { connect } from 'react-redux';
import c from'classnames';

import { ProvideDndProvider } from './dnd-provider';
import { Menu } from './menu';
import { Description } from '../interventions/description';
import { Interventions } from '../interventions';
import { Board } from '../board';
import { Badges } from '../badges';
import { Score } from '../indicators/score';
import { Tooltip } from '../indicators/tooltip';
import { Thermometer } from '../indicators/thermometer';
import { WinNotification } from '../indicators/win-notification';
import { scoreSelectors } from '../store/score-selectors';

let Game = class Game extends React.PureComponent {
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

  render() {
    const { containerWidth, containerHeight } = this.state;
    const { props } = this;
    return (
      <>
        <ProvideDndProvider>
          <div className={c(
            'w-full viewport-fill absolute top left flex-parent flex-parent--column flex-parent--end-main',
            { 'gradient-red': !props.hasWon, 'gradient-blue': props.hasWon }
          )} ref={this.container}>
            <div className="flex-child">
              <Board containerWidth={containerWidth} containerHeight={containerHeight} />
            </div>
            <div className="flex-child px3 py3 bg-black">
              <Score />
            </div>
            <div className="absolute right mr60 viewport-fill flex-parent flex-parent--column flex-parent--center-main">
              <Thermometer className="flex-child" />
            </div>
          </div>
          <div className="absolute top left w-full">
            <Menu />
            <Interventions />
          </div>
        </ProvideDndProvider>
        <div className="absolute bottom right mb120" style={{ zIndex: 20 }}>
          <Badges />
        </div>
        <WinNotification />
        <Tooltip />
      </>
    );
  }
};

const mapStateToProps = state => ({
  hasWon: scoreSelectors.hasWon(state)
});

Game = connect(mapStateToProps)(Game);
export { Game };
