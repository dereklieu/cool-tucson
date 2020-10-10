'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import c from'classnames';

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

let Game = (props) => (
  <>
    <DndProvider backend={HTML5Backend}>
      <div className={c(
        'w-full viewport-full absolute top left flex-parent flex-parent--column flex-parent--end-main',
        { 'gradient-red': !props.hasWon, 'gradient-blue': props.hasWon }
      )}>
        <div className="absolute right viewport-full mr60 flex-parent flex-parent--column flex-parent--center-main">
          <Thermometer className="flex-child" />
        </div>
        <div className="flex-child scroll-hidden">
          <Board />
        </div>
        <div className="flex-child px3 py3 bg-black">
          <Score />
        </div>
      </div>
      <div className="absolute top left w-full">
        <Menu />
        <Interventions />
      </div>
    </DndProvider>
    <div className="absolute bottom right mb120" style={{ zIndex: 20 }}>
      <Badges />
    </div>
    <WinNotification />
    <Tooltip />
  </>
);

const mapStateToProps = state => ({
  hasWon: scoreSelectors.hasWon(state)
});

Game = connect(mapStateToProps)(Game);
export { Game };
