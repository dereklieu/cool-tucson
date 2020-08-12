'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Description } from '../interventions/description';
import { Interventions } from '../interventions';
import { Board } from '../board';
import { Badges } from '../badges';
import { Bin } from '../board/bin';
import { Score } from '../indicators/score';
import { Tooltip } from '../indicators/tooltip';

export const Game = () => (
  <div className="scroll-hidden viewport-full relative">
    <DndProvider backend={HTML5Backend}>
      <Bin className="w-full viewport-full absolute top left flex-parent flex-parent--column flex-parent--end-main">
        <div className="flex-child mt30" style={{ marginBottom: 'auto' }}>
          <Score />
        </div>
        <div className="flex-child mb30">
          <div className="flex-parent flex-parent--center-main">
            <Description className="flex-child" />
          </div>
        </div>
        <div className="flex-child mb30">
          <Interventions />
        </div>
        <div className="flex-child">
          <Board />
        </div>
      </Bin>
    </DndProvider>
    <div className="absolute right mt30">
      <Badges />
    </div>
    <Tooltip />
  </div>
);
