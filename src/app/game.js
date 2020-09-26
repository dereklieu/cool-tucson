'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Menu } from './menu';
import { Description } from '../interventions/description';
import { Interventions } from '../interventions';
import { Board } from '../board';
import { Badges } from '../badges';
import { Score } from '../indicators/score';
import { Tooltip } from '../indicators/tooltip';

export const Game = () => (
  <>
    <DndProvider backend={HTML5Backend}>
      <div className="w-full viewport-full absolute top left flex-parent flex-parent--column flex-parent--end-main gradient-red">
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
    <div className="absolute bottom right mb120">
      <Badges />
    </div>
    <Tooltip />
  </>
);
