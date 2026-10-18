import React, { useEffect, useReducer, useState } from "react";
import { createGame, encodeWord, gameReducer } from "../utils/gameLogic";
import { WORDS, GUESS_COST } from "../utils/constants";
import "../styles/gamePage.css";
const pickWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
export default function GamePage() {
  const [game, dispatch] = useReducer(gameReducer, undefined, () =>
    createGame(pickWord())
  );
  const [guess, setGuess] = useState("");
  useEffect(() => {
    if (game.status !== "playing") return;
    const timer = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(timer);
  }, [game.status]);
  const submit = (event) => {
    event.preventDefault();
    dispatch({ type: "GUESS", guess });
    setGuess("");
  };
  const restart = () => {
    setGuess("");
    dispatch({ type: "RESET", secret: pickWord() });
  };
  return (
    <main className="game-shell">
      <header className="game-header">
        <div>
          <p className="eyebrow">THE BINARY VAULT</p>
          <h1>Quantum Code Breaker</h1>
        </div>
        <button className="quiet-button" onClick={restart}>
          New game
        </button>
      </header>
      <div className="game-layout">
        <section className="vault" aria-labelledby="vault-title">
          <p className="eyebrow">CHALLENGE 01 / ASCII</p>
          <h2 id="vault-title">Four bytes. One word.</h2>
          <p>
            Each row is an uppercase letter in 8-bit ASCII. Convert the four
            rows to unlock the vault.
          </p>
          <div className="binary-board" aria-label="Binary code">
            {encodeWord(game.secret).map((byte, i) => (
              <div className="binary-row" key={i}>
                <span className="byte-index">0{i + 1}</span>
                <code>{byte}</code>
              </div>
            ))}
          </div>
          <details>
            <summary>Need a decoding hint?</summary>
            <p>
              Binary place values are 128, 64, 32, 16, 8, 4, 2, 1. Add the
              values where the bit is 1. A = 65, B = 66, and so on. For example,
              01000001 means A.
            </p>
          </details>
        </section>
        <aside className="game-panel">
          <h2>Your session</h2>
          <dl className="game-stats">
            <div>
              <dt>Energy</dt>
              <dd>{game.energy}</dd>
            </div>
            <div>
              <dt>Rolls left</dt>
              <dd>{game.turns}</dd>
            </div>
            <div>
              <dt>Time left</dt>
              <dd>
                {Math.floor(game.time / 60)}:
                {String(game.time % 60).padStart(2, "0")}
              </dd>
            </div>
          </dl>
          <button
            className="roll-button"
            onClick={() =>
              dispatch({
                type: "ROLL",
                value: Math.floor(Math.random() * 6) + 1,
              })
            }
            disabled={!game.turns || game.status !== "playing"}
          >
            Roll dice · gain energy
          </button>
          {game.lastRoll !== null && (
            <p>
              Last roll: {game.lastRoll} (+{game.lastRoll * 10} energy)
            </p>
          )}
          <form onSubmit={submit}>
            <label htmlFor="guess">Your four-letter answer</label>
            <input
              id="guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              maxLength={4}
              pattern="[A-Za-z]{4}"
              autoComplete="off"
              autoCapitalize="characters"
              required
              disabled={game.status !== "playing"}
            />
            <button
              className="decode-button"
              disabled={game.status !== "playing" || game.energy < GUESS_COST}
            >
              Unlock · {GUESS_COST} energy
            </button>
          </form>
          <p className={`game-notice ${game.status}`} role="status">
            {game.notice}
          </p>
          {game.status !== "playing" && (
            <div>
              <p>
                The code was <strong>{game.secret}</strong>.
              </p>
              <button className="roll-button" onClick={restart}>
                Play again
              </button>
            </div>
          )}
        </aside>
      </div>
      <section className="guess-history">
        <h2>Attempt log</h2>
        {game.guesses.length ? (
          <ol>
            {game.guesses.map((attempt, i) => (
              <li key={i}>
                <code>{attempt.word}</code>
                <span>{attempt.correct}/4 letters in position</span>
              </li>
            ))}
          </ol>
        ) : (
          <p>No guesses yet. Each attempt costs 20 energy.</p>
        )}
      </section>
    </main>
  );
}
