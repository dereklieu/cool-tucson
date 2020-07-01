'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

const pixel = (number) => Math.floor(number) + 'px';

const width = 900;
const ratio = .3;
const height = width * ratio;
const rowLength = 4;

const plotStyle = {
  borderBottom: `${pixel(width * ratio)} solid #eee`,
  borderLeft: `${pixel(width * ratio / 2)} solid transparent`,
  borderRight: `${pixel(width * ratio / 2)} solid transparent`,
  height: 0,
  width: `${width}px`
};

const containerDimensions = {
  top: 0,
  left: `-${Math.floor(width * ratio / 2)}px`,
  width: `${width}px`,
  height: `${Math.floor(width * ratio)}px`
};

export class Plots extends React.PureComponent {
  renderPlots(height) {
    return (
      <div className="grid grid--gut24">
        {[...Array(rowLength)].map((_, i) => this.renderPlot(height, i))}
      </div>
    )
  }

  renderPlot(height, i) {
    return (
      <div
        className="col flex-parent flex-parent--column flex-parent--center-main"
        style={{ height: pixel(height) }}
        key={`plot-${i}`}
      >
        <Plot height={height} />
      </div>
    );
  }

  render() {
    return (
      <div className="relative" style={plotStyle}>
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: pixel(width * (1 - ratio)),
            height: pixel(height * .4)
          }}
        >
          {this.renderPlots(height * .4)}
        </div>

        <div
          className="absolute"
          style={{
            top: pixel(height * .4),
            left: pixel(-width * ratio * .4 / 2),
            width: pixel(width - width * ratio * .6),
            height: pixel(height * .6)
          }}
        >
          {this.renderPlots(height * .6)}
        </div>
      </div>
    );
  }
}

function Plot (props) {
  const { height } = props;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'INTERVENTION',
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  });

  const containerClass = c('w-full', {
    'border border--gray': isOver,
    'border border--gray-light': canDrop && !isOver
  });

  return (
    <div
      className={containerClass}
      style={{ height: pixel(height / 2), borderRadius: '50%' }}
      ref={drop}
    />
  );
}
