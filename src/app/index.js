'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Interventions } from '../interventions';
import { Board } from '../board';
import { Bin } from '../board/bin';
import { Score } from '../indicators/score';
import { Tooltip } from '../indicators/tooltip';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="scroll-hidden viewport-full relative">
        <Tooltip />
        <div className="absolute right mr30 mt30">
          <Score />
        </div>
        <DndProvider backend={HTML5Backend}>
          <Bin className="w-full viewport-full absolute top left flex-parent flex-parent--column flex-parent--end-main">
            <div className="flex-child">
              <Interventions />
            </div>
            <div className="flex-child">
              <Board />
            </div>
          </Bin>
        </DndProvider>
      </div>
    )
  }
}
