'use strict';
import React from 'react';
import { Interventions } from '../interventions';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="scroll-hidden viewport-full relative">
        <div className="absolute bottom left w-full">
          <div className="mb30">
            <Interventions />
          </div>
        </div>
      </div>
    )
  }
}
