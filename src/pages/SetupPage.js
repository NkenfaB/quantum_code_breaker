import React from "react";
export default function SetupPage({ navigateTo }) {
  return (
    <main className="game-intro">
      <p className="eyebrow">HOW TO PLAY</p>
      <h1>Break the binary code.</h1>
      <ol>
        <li>Roll a six-sided die to gain 10–60 energy. You have five rolls.</li>
        <li>Decode four binary ASCII letters using the built-in hint.</li>
        <li>
          Spend 20 energy per guess. Solve it before five minutes run out.
        </li>
      </ol>
      <button className="roll-button" onClick={() => navigateTo("game")}>
        Start challenge
      </button>
    </main>
  );
}
