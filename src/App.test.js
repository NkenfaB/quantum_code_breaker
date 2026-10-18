import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import GamePage from "./pages/GamePage";
import { createGame, encodeWord, gameReducer } from "./utils/gameLogic";

test("welcome leads to instructions and a playable challenge", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Play the challenge" }));
  expect(screen.getByText("Break the binary code.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Start challenge" }));
  expect(screen.getByLabelText("Your four-letter answer")).toBeInTheDocument();
});
test("rolling enables guesses and new game resets the session", () => {
  const random = jest.spyOn(Math, "random").mockReturnValue(0.5);
  render(<GamePage />);
  expect(screen.getByRole("button", { name: /Unlock/ })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: /Roll dice/ }));
  expect(screen.getByRole("button", { name: /Unlock/ })).toBeEnabled();
  fireEvent.click(screen.getByRole("button", { name: "New game" }));
  expect(screen.getByRole("button", { name: /Unlock/ })).toBeDisabled();
  random.mockRestore();
});
test("correct guess wins, consumes energy, and freezes the clock", () => {
  let state = gameReducer(createGame("CODE"), { type: "ROLL", value: 2 });
  state = gameReducer(state, { type: "GUESS", guess: "code" });
  expect(state.status).toBe("won");
  expect(state.energy).toBe(0);
  expect(gameReducer(state, { type: "TICK" })).toBe(state);
});
test("invalid guesses cost no energy and resources never go below zero", () => {
  const initial = createGame("CODE");
  expect(gameReducer(initial, { type: "GUESS", guess: "CODE" }).energy).toBe(0);
  let state = { ...initial, turns: 0, energy: 20 };
  state = gameReducer(state, { type: "GUESS", guess: "BYTE" });
  expect(state.status).toBe("lost");
  expect(state.energy).toBe(0);
  expect(gameReducer(state, { type: "ROLL", value: 6 }).turns).toBe(0);
});
test("timeout ends the game; ASCII clues match the secret", () => {
  const state = gameReducer(
    { ...createGame("CODE"), time: 1 },
    { type: "TICK" }
  );
  expect(state.status).toBe("lost");
  expect(state.time).toBe(0);
  expect(encodeWord("CODE")).toEqual([
    "01000011",
    "01001111",
    "01000100",
    "01000101",
  ]);
});
