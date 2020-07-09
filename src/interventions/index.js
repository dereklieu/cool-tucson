'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { Intervention } from './intervention';
import { interventions } from './interventions';
import constants from '../constants';

let Interventions = class Interventions extends React.PureComponent {
  renderInterventions() {
    const { locale } = this.props;

    return interventions.map(d => (
      <div className="flex-child" key={d.name} data-tip={d.name}>
        <div className="my6 border round">
          <Intervention
            id={d.name}
            name={d.name}
            score={d.score[locale]}
            dragType={constants.NEW_INTERVENTION}
          />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div
        className="flex-parent flex-parent--column flex-parent--center-main viewport-full"
      >
        {this.renderInterventions()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state)
});

Interventions = connect(
  mapStateToProps
)(Interventions);

export { Interventions };
