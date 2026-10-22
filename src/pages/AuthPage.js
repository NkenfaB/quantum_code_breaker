import React from "react";
export default function AuthPage({ navigateTo }) {
  return (
    <main className="game-intro">
      <p className="eyebrow">A SMALL GAME ABOUT BIG IDEAS</p>
      <h1>
        Quantum
        <br />
        Code Breaker
      </h1>
      <p>Read the bits. Manage your energy. Open the vault.</p>
      <button className="roll-button" onClick={() => navigateTo("setup")}>
        Play the challenge
      </button>
      <p>No account required.</p>
    </main>
  );
}
