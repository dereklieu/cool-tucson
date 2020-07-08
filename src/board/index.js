'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Cell } from './cell';
import { px } from '../util/style-util';

import { boardSelectors } from '../store/board-selectors';
import { scoreSelectors } from '../store/score-selectors';
import { boardActionCreators } from '../store/board-action-creators';

const width = 900;
const ratio = .4;
const height = width * ratio;
const rowLength = 4;

const cellStyle = {
  borderBottom: `${px(width * ratio)} solid #eee`,
  borderLeft: `${px(width * ratio / 2)} solid transparent`,
  borderRight: `${px(width * ratio / 2)} solid transparent`,
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
  renderRow(cells, row, height) {
    const { dropIntervention, currency } = this.props;
    const containerClass = 'col flex-parent flex-parent--column flex-parent--center-main';
    const containerStyle = { height: px(height) };
    return (
      <div className="grid grid--gut24">
        {cells[row].map((cell, column) => (
          <div
            key={`cell-${row}-${column}`}
            className={containerClass}
            style={containerStyle}
          >
            <Cell
              cell={cell}
              height={height}
              row={row}
              column={column}
              currency={currency}
              dropIntervention={dropIntervention}
            />
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { cells } = this.props;
    return (
      <div className="relative" style={cellStyle}>
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: px(width * (1 - ratio)),
            height: px(height * .4)
          }}
        >
          {this.renderRow(cells, 0, height * .4)}
        </div>

        <div
          className="absolute"
          style={{
            top: px(height * .4),
            left: px(-width * ratio * .4 / 2),
            width: px(width - width * ratio * .6),
            height: px(height * .6)
          }}
        >
          {this.renderRow(cells, 1, height * .6)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cells: boardSelectors.cells(state),
  currency: scoreSelectors.currency(state)
});

const mapDispatch = {
  dropIntervention: boardActionCreators.dropIntervention
};

Board = connect(
  mapStateToProps,
  mapDispatch
)(Board);

export { Board };
