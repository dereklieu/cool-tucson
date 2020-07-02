'use strict';
import React from 'react';
import { Intervention } from './intervention';

export class Interventions extends React.PureComponent {
  renderInterventions() {
    const interventions = [
      {
        icon: 'bike',
        description: 'Biking is fun',
        cost: 4
      },
      {
        icon: 'cloud',
        description: 'Cool, cool shade',
        cost: 2
      },
      {
        icon: 'water',
        description: 'How about a water feature',
        cost: 8
      }
    ];

    return interventions.map(d => (
      <div className="flex-child" key={d.icon}>
        <div className="mx6 border round">
          <Intervention id={d.icon} icon={d.icon}/>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="flex-parent flex-parent--center-main">
        {this.renderInterventions()}
      </div>
    );
  }
}
