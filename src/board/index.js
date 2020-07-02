'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Cell } from './cell';
import { pixel } from '../util/style-util';
import { boardSelectors } from '../store/board-selectors';

const width = 900;
const ratio = .3;
const height = width * ratio;
const rowLength = 4;

const cellStyle = {
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

let Board = class Board extends React.PureComponent {
  renderRow(height) {
    return (
      <div className="grid grid--gut24">
        {[...Array(rowLength)].map((_, i) => this.renderCell(height, i))}
      </div>
    )
  }

  renderCell(height, i) {
    return (
      <div
        className="col flex-parent flex-parent--column flex-parent--center-main"
        style={{ height: pixel(height) }}
        key={`cell-${i}`}
      >
        <Cell height={height} />
      </div>
    );
  }

  render() {
    return (
      <div className="relative" style={cellStyle}>
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: pixel(width * (1 - ratio)),
            height: pixel(height * .4)
          }}
        >
          {this.renderRow(height * .4)}
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
          {this.renderRow(height * .6)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cells: boardSelectors.cells(state)
});

Board = connect(
  mapStateToProps
)(Board);

export { Board };
