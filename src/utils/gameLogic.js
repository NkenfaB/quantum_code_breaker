import {
  INITIAL_TURNS,
  INITIAL_ENERGY,
  INITIAL_TIME,
  GUESS_COST,
} from "./constants";
export const calculateEnergyGain = (diceValue) => diceValue * 10;
export const encodeWord = (word) =>
  [...word].map((letter) => letter.charCodeAt(0).toString(2).padStart(8, "0"));
export function createGame(secret) {
  return {
    secret,
    energy: INITIAL_ENERGY,
    turns: INITIAL_TURNS,
    time: INITIAL_TIME,
    guesses: [],
    lastRoll: null,
    status: "playing",
    notice: "Roll the dice to collect energy.",
  };
}
function settle(state) {
  if (
    state.status === "playing" &&
    (state.time === 0 || (state.turns === 0 && state.energy < GUESS_COST))
  ) {
    return {
      ...state,
      status: "lost",
      notice: state.time === 0 ? "Time is up." : "No rolls or energy left.",
    };
  }
  return state;
}
export function gameReducer(state, action) {
  if (action.type === "RESET") return createGame(action.secret);
  if (state.status !== "playing") return state;
  switch (action.type) {
    case "TICK":
      return settle({ ...state, time: Math.max(0, state.time - 1) });
    case "ROLL": {
      if (
        !state.turns ||
        !Number.isInteger(action.value) ||
        action.value < 1 ||
        action.value > 6
      )
        return state;
      return {
        ...state,
        energy: state.energy + calculateEnergyGain(action.value),
        turns: state.turns - 1,
        lastRoll: action.value,
        notice: `Rolled ${action.value}. Decode the binary and submit your answer.`,
      };
    }
    case "GUESS": {
      const guess = String(action.guess || "")
        .trim()
        .toUpperCase();
      if (!/^[A-Z]{4}$/.test(guess))
        return { ...state, notice: "Enter exactly four letters." };
      if (state.energy < GUESS_COST)
        return { ...state, notice: "You need 20 energy. Roll again." };
      const correct = [...guess].filter(
        (letter, i) => letter === state.secret[i]
      ).length;
      return settle({
        ...state,
        energy: state.energy - GUESS_COST,
        guesses: [...state.guesses, { word: guess, correct }],
        status: correct === 4 ? "won" : "playing",
        notice:
          correct === 4
            ? "Code unlocked!"
            : `${correct} of 4 letters are in the right position.`,
      });
    }
    default:
      return state;
  }
}
