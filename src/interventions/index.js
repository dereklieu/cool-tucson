'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { boardSelectors } from '../store/board-selectors';
import { boardActionCreators } from '../store/board-action-creators';
import { Intervention } from './intervention';
import { interventions, getBaseIntervention } from './interventions';
import { groupBy } from '../util/group-by';
import constants from '../constants';

const interventionGroups = groupBy(interventions, 'type');

let Interventions = class Interventions extends React.PureComponent {
  renderGroup = (interventions, type) => {
    return (
      <div className="flex-parent flex-parent--center-cross" key={type}>
        {
          [
            getBaseIntervention(type),
            ...interventions
          ].map(this.renderIntervention)
        }
      </div>
    );
  };

  renderIntervention = (d) => {
    const {
      locale,
      changeActiveIntervention,
      activeIntervention
    } = this.props;
    return (
      <div className="flex-child" key={d.name}>
        <Intervention
          id={d.id}
          name={d.name}
          interventionType={d.type}
          isActive={d.name === activeIntervention}
          changeActiveIntervention={changeActiveIntervention}
          score={d.score[locale]}
          dragType={constants.NEW_INTERVENTION}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        {Object.keys(interventionGroups).map(group =>
          this.renderGroup(interventionGroups[group], group)
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state),
  activeIntervention: boardSelectors.activeIntervention(state)
});

const mapDispatch = {
  changeActiveIntervention: boardActionCreators.changeActiveIntervention
};

Interventions = connect(
  mapStateToProps,
  mapDispatch
)(Interventions);

export { Interventions };
