'use strict';
import React from 'react';

export class Interventions extends React.PureComponent {
  select(icon) {
    console.log(icon);
  }

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
      <div
        className="flex-child px12 py12 mx6 cursor-pointer border round"
        key={d.icon}
        onClick={() => this.select(d.icon)}
      >
        <svg className="icon w36 h36"><use xlinkHref={`#icon-${d.icon}`} /></svg>
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
