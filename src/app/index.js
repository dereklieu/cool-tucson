'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Interventions } from '../interventions';
import { Plots } from '../plots';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="scroll-hidden viewport-full relative">
          <div className="absolute w-full viewport-full top left flex-parent flex-parent--column flex-parent--center-main">
            <div className="flex-child w-full">
              <div className="flex-parent flex-parent--center-main">
                <div className="flex-child">
                  <Plots />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom left w-full">
            <div className="mb30">
              <Interventions />
            </div>
          </div>
        </div>
      </DndProvider>
    )
  }
}
