'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { interventionSelectors } from '../store/intervention-selectors';
import { interventionActionCreators } from '../store/intervention-action-creators';

import { Modal } from '../indicators/modal';
import { Intervention } from './intervention';
import { Description } from './description';
import { Eraser } from '../board/eraser';
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
    const { activeIntervention } = this.props;
    return (
      <div className="flex-child" key={d.name}>
        <Intervention
          name={d.name}
          type={d.type}
          isActive={d.name === activeIntervention}
          cost={d.cost}
        />
      </div>
    );
  };

  render() {
    return (
      <>
        <div className="w-full flex-parent flex-parent--center-main flex-parent--end-cross flex-parent--wrap">
          {interventions.map(this.renderIntervention)}
          <div className="flex-child ml6">
            <Eraser />
          </div>
        </div>
        {this.props.activeIntervention ? (
          <Modal onExit={this.clear}>
            <Description />
          </Modal>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
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
