'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactTooltip from 'react-tooltip';

import { Interventions } from '../interventions';
import { Board } from '../board';
import { Score } from '../indicators/score';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="scroll-hidden viewport-full relative">
        <DndProvider backend={HTML5Backend}>
          <div className="absolute w-full viewport-full top left flex-parent flex-parent--column flex-parent--center-main">
            <div className="flex-child w-full">
              <div className="flex-parent flex-parent--center-main">
                <div className="flex-child">
                  <Board />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom left w-full">
            <div className="mb30">
              <Interventions />
            </div>
          </div>
        </DndProvider>
        <div className="absolute top left w-full">
          <div className="mt30">
            <Score />
          </div>
        </div>
        <ReactTooltip
          className="px12 py12 txt-bold txt-m round"
          offset={{ top: 10 }}
          effect="solid"
        />
      </div>
    )
  }
}
