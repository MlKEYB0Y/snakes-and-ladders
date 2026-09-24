import { afterEach, describe, expect, it, vi } from "vitest";
import { Game } from "../src/game.js";

describe("Feature 1: Starting & Moving", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("1.1: a new game starts with Player 1 and Player 2 on Square 1", () => {
    const game = new Game(["Player 1", "Player 2"]);

    expect(game.getPosition("Player 1")).toBe(1);
    expect(game.getPosition("Player 2")).toBe(1);
  });

  it("1.2: Player 1 on Square 1 rolls a 4, lands on Square 5", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");

    expect(game.getPosition("Player 1")).toBe(5);
  });

  it("1.3: Player 1 rolls a 3, then a 4, landing on Square 8", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.5);
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");
    game.takeTurn("Player 1");

    expect(game.getPosition("Player 1")).toBe(8);
  });

  it("a game can start a player on a specified square", () => {
    const game = new Game(
      ["Player 1", "Player 2"],
      new Map([["Player 1", 97]]),
    );

    expect(game.getPosition("Player 1")).toBe(97);
    expect(game.getPosition("Player 2")).toBe(1);
  });
});

describe("Feature 2: Winning", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("2.1: Player 1 on Square 97 rolls a 3, lands on Square 100 and wins", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    const game = new Game(
      ["Player 1", "Player 2"],
      new Map([["Player 1", 97]]),
    );

    const winner = game.takeTurn("Player 1");

    expect(game.getPosition("Player 1")).toBe(100);
    expect(winner).toBe("Player 1 wins");
  });

  it("2.2: Player 1 on Square 97 rolls a 4, bounces back to Square 99", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const game = new Game(
      ["Player 1", "Player 2"],
      new Map([["Player 1", 97]]),
    );

    game.takeTurn("Player 1");

    expect(game.getPosition("Player 1")).toBe(99);
  });

  it("2.3: once a player has won, further turns are not allowed", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    const game = new Game(
      ["Player 1", "Player 2"],
      new Map([["Player 1", 97]]),
    );

    game.takeTurn("Player 1");

    expect(() => game.takeTurn("Player 2")).toThrow("Game is over");
    expect(game.getPosition("Player 2")).toBe(1);
  });
});
