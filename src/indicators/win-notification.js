'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { confetti } from '../util/confetti';
import { scoreSelectors } from '../store/score-selectors';
import { boardSelectors } from '../store/board-selectors';

import { IconLabel } from './icon-label';
import { CopyLink } from './copy-link';
import { Modal } from './modal';

import { colorText } from '../util/style-util';
import constants from '../constants';

let WinNotification = class WinNotification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasWon: props.hasWon,
      showModal: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.hasWon && !prevProps.hasWon && !this.state.hasWon) {
      this.confetti();
    }
  }

  confetti = () => {
    this.setState({ hasWon: true, showModal: true });
    confetti.start();
    setTimeout(() => confetti.stop(), 3000);
  };

  closeModal = () => this.setState({ showModal: false });
  showModal = () => this.setState({ showModal: true });

  render() {
    const { hasWon, showModal } = this.state;
    const { props } = this;

    const modal = showModal ? (
      <Modal onExit={this.closeModal}>
        <div className="py24 px24 round shadow shadow-darken10">
          <div className="prose align-center">
            <h2 className="txt-h2">🎉 You did it! 🎉</h2>
            <p className="txt-l">You've made {constants.LOCALES[props.locale]} {colorText('the chillest city', 'color-blue')}.</p>
            <p className="txt-l">Use this link to share your wise ways.</p>
            <CopyLink />
            <p className="txt-m mt12">You can always find this link at the <IconLabel inline={true} icon="star" size={18} />. It will continue to update as you make more improvements.</p>
          </div>
        </div>
      </Modal>
    ) : null;

    const icon = hasWon ? (
      <div className="fixed top right" onClick={this.showModal}>
        <IconLabel className="mt60 mr12 cursor-pointer" icon="star" size={36} />
      </div>
    ) : null;

    return (
      <>
        {icon}
        {modal}
      </>
    );
  }
}

const mapStateToProps = state => ({
  hasWon: scoreSelectors.hasWon(state),
  locale: boardSelectors.locale(state)
});

WinNotification = connect(mapStateToProps)(WinNotification);

export { WinNotification };
