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

export const Game = () => (
  <div className="scroll-hidden viewport-full relative">
    <div className="absolute right mr30 mt30">
      <Score />
    </div>
    <DndProvider backend={HTML5Backend}>
      <Bin className="w-full viewport-full absolute top left flex-parent flex-parent--column flex-parent--end-main">
        <div className="flex-child mb120">
          <div className="flex-parent flex-parent--center-main">
            <Description className="flex-child" />
          </div>
        </div>
        <div className="flex-child">
          <Board />
        </div>
      </Bin>

      <div className="absolute top left ml30 mt30">
        <Interventions />
      </div>
    </DndProvider>
    <Badges />
  </div>
);
