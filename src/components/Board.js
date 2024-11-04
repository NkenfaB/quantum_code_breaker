import React from 'react';
import '../styles/board.css';

const gridContent = [
  ['0', '0', '0', '0', 'e'],
  ['0', 'q', '0', 'q', 'a'],
  ['a', 'e', '0', 'e', '0'],
  ['0', '0', 'a', '0', '0'],
  ['e', 'q', '0', 'q', '0'],
  ['0', '0', '0', 'q', 'e'],
];

const Cell = ({ content }) => {
  return (
    <div className="cell">
      <div className='sub_cell'>{content === '0' ? '' : content}</div>
    </div>
  );
};

const Board = () => {
  return (
    <div className="board">
      {gridContent.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellContent, colIndex) => (
            <Cell key={colIndex} content={cellContent} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
