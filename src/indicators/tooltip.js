'use strict';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { interventions } from '../interventions/interventions'
import { settingSelectors } from '../store/setting-selectors';

let Tooltip = class Tooltip extends React.PureComponent {
  getContent = (name) => {
    if (!name) return null;
    const i = interventions.find(i => i.name === name);
    const score = i.score[this.props.locale];
    return (
      <div>
        <h3><strong>{name}</strong></h3>
        <ul>
          <li>Cost: -{score.cost}</li>
          <li>Social: +{score.social}</li>
          <li>Environmental: +{score.environmental}</li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <ReactTooltip
        className="px12 py12 txt-m round"
        offset={{ right: 10 }}
        place="right"
        effect="solid"
        getContent={this.getContent}
      />
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state)
});

Tooltip = connect(mapStateToProps)(Tooltip);

export { Tooltip };
