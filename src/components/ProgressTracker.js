
import React from 'react';
import '../styles/progressTracker.css';
import sustain from '../assets/images/sustain.png'; 
import coin from '../assets/images/coin.png';
import timer from '../assets/images/timer.png';

const ProgressTracker = ({ energy, turns, time }) => {
  return (
    <div className="progress-tracker">
      <div className='container'>
        <div className='box_style'>
          <img src={sustain} alt="Infinity icon" className="icon" />
          <div className='title'>Energy</div>
          <div className='parameter'>{energy}/10</div>
        </div>
      </div>
      <div className='container'>
        <div className='box_style'>
          <img src={coin} alt="Circular 5 icon" className="icon" />
          <div className='title'>Tokens</div>
          <div className='parameter'>{turns}</div>
        </div>
      </div>
      <div className='container'>
        <div className='box_style'>
          <img src={timer} alt="Clock icon" className="icon" />
          <div className='title'>Time</div>
          <div className='parameter'>{time} Secs</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
