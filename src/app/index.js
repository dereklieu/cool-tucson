'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd'
import { Provider } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend'

import { store } from '../store';
import { Interventions } from '../interventions';
import { Board } from '../board';
import { ProgressBar } from '../indicators/progress-bar';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div className="scroll-hidden viewport-full relative">
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
          </div>
        </DndProvider>
        <div className="absolute top left w-full">
          <div className="mt30 grid">
            <div className="col--6 col--offl3">
              <ProgressBar
                barClassName="bg-gray-light"
                progress={93}
              />
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}
