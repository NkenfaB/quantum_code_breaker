import React from 'react';

const SetupPage = ({ navigateTo }) => {
  return (
    <div className="setup-page">
      <h2>Game Setup</h2>
      <p>Instructions and setup information goes here.</p>
      <button onClick={() => navigateTo("game")}>Start Game</button>
    </div>
  );
};

export default SetupPage;
