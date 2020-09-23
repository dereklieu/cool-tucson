'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { interventionSelectors } from '../store/intervention-selectors';
import { interventionActionCreators } from '../store/intervention-action-creators';

import { Intervention } from './intervention';
import { Description } from './description';
import { CloseButton } from '../indicators/close-button';

import { interventions } from './interventions';

let Interventions = class Interventions extends React.PureComponent {
  renderGroup = (interventions) => {
    return interventions.map(this.renderIntervention);
  };

  clear = () => {
    this.props.setIntervention(null);
  };

  renderIntervention = (d) => {
    const { locale, activeIntervention } = this.props;
    return (
      <div className="flex-child" key={d.name}>
        <Intervention
          name={d.name}
          type={d.type}
          isActive={d.name === activeIntervention}
          score={d.score[locale]}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="flex-parent flex-parent--center-main flex-parent--end-cross flex-parent--wrap">
        {interventions.map(this.renderIntervention)}
        {this.props.activeIntervention ? (
          <div className="relative bg-white px24 py24 mt24 round shadow shadow-darken10">
            <Description />
            <CloseButton onClick={this.clear} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state),
  activeIntervention: interventionSelectors.active(state)
});

const mapDispatch = {
  setIntervention: interventionActionCreators.setIntervention
};

Interventions = connect(
  mapStateToProps,
  mapDispatch
)(Interventions);

export { Interventions };
