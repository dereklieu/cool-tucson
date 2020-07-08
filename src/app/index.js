'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { scoreSelectors } from '../store/score-selectors';

import { Interventions } from '../interventions';
import { Board } from '../board';
import { ProgressBar } from '../indicators/progress-bar';

let App = class App extends React.PureComponent {
  render() {
    const {
      currency
    } = this.props;

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
          <div className="mt30 grid">
            <div className="col--6 col--offl3">
              <ProgressBar
                barClassName="bg-gray-light"
                progress={currency}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: scoreSelectors.currency(state)
});

App = connect(
  mapStateToProps
)(App);

export { App };
