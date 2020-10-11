'use strict';
import React from 'react';
import c from 'classnames';

import { px, x, y } from '../util/style-util';

class ActiveIntervention extends React.PureComponent {
  constructor(props) {
    super(props);
    const isMounted = Boolean(props.isPreview);
    this.state = {
      mounted: isMounted,
      complete: isMounted
    };
  }

  componentDidMount() {
    if (!this.props.isPreview) {
      setTimeout(() => this.setState({ mounted: true }), 10);
      setTimeout(() => this.setState({ complete: true }), 500);
    }
  }

  render () {
    const { intervention, ratio, isPreview } = this.props;
    const { mounted, complete } = this.state;

    const { svg, placement } = intervention;

    const width = px(svg.w * ratio);
    const height = px(svg.h * ratio);
    const left = px(placement.x * ratio);
    const top = px(placement.y * ratio);

    const containerStyle = { top, left };

    let opacity;
    if (isPreview) opacity = 0.4;
    else if (!mounted) opacity = 0.2;
    else opacity = 1;

    const svgStyle = {
      width,
      height,
      transition: complete ? undefined : 'all 400ms ease-out',
      top: mounted ? 0 : px(-30),
      opacity
    };

    return (
      <div className="absolute" style={containerStyle}>
        <div className="relative">
          <svg className="icon absolute" style={svgStyle}>
            <use xlinkHref={`#${svg.id}`} />
          </svg>
        </div>
      </div>
    );

  }
}

export { ActiveIntervention };
