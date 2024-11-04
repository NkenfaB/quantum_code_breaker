import React from 'react';
import '../styles/dice.css';

const Dice = ({ rollDice }) => {
  return (
    <div className="dice-container">
      <button onClick={rollDice} className="dice-button">Roll Dice 🎲</button>
    </div>
  );
};

export default Dice;
