'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip';
import { IconLabel } from './icon-label';
import { encode, decode } from '../util/encode';
import constants from '../constants';

let CopyLink = class CopyLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showTooltip: false };
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.buttonRef.current, {
      target: () => document.getElementById('chill-city-share-link')
    });

    this.clipboard.on('success', () => {
      this.setState({ showTooltip: true });
      ReactTooltip.rebuild();
      ReactTooltip.show(this.buttonRef.current);
      setTimeout(() => {
        // Check that we haven't unmounted
        if (this.clipboard) {
          this.setState({ showTooltip: false });
        }
      }, 1000);
    });
  }

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = null;
    }
  }

  render() {
    const tail = encode(this.props.state);
    const url = window.location.href + 'share/' + tail;
    return (
      <div className="flex-parent flex-parent--center-cross">
        <input type="text" className="flex-child input" readOnly={true} value={url} id="chill-city-share-link" />
        <button
          type="button"
          className="flex-child btn round ml3"
          id="chill-city-share-button"
          data-tip={this.state.showTooltip ? constants.COPY : null}
          data-place="top"
          ref={this.buttonRef}
        >
          <IconLabel size="18" inline={true} icon="clipboard" />
        </button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  state: state.board
});

CopyLink = connect(mapStateToProps)(CopyLink);
export { CopyLink };
