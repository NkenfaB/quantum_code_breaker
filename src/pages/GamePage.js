import React, { useState } from 'react';
import Board from '../components/Board';
import ProgressTracker from '../components/ProgressTracker';
import '../styles/gamePage.css';
import Lock from '../assets/images/Lock.png';


const GamePage = () => {
  const [energy, setEnergy] = useState(0);
  const [turns, setTurns] = useState(5);
  const [time, setTime] = useState(300);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    console.log("Dice rolled:", result);
    setEnergy((prevEnergy) => prevEnergy + result * 10);
    setTurns((prevTurns) => prevTurns - 1);
  };

  return (
    <div className="global_container">
        <div div className='game_container'>
          <div className='Container_Board'>
             <Board />
          </div>
          <div className='Container_Progress'>
          <ProgressTracker energy={energy} turns={turns} time={time} />
          </div>
        </div>

        <div className='Plaintext_Button'>
          <div className='Container_Board2'>01001000010010010010010000100100101001000010010010101000010010010100100 ...</div>
          <button className='Container_Code'>Gain Energy</button>
        </div>

        <div className='dice_container'>
          <div className='Container_Board2'>
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          <img src={Lock} alt="Infinity icon" className="icon" />
          </div>
          <button className='Container_Key'>Roll Dice</button>
        </div>
    </div>
  );
};

export default GamePage;
