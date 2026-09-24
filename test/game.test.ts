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
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.4) // Player 1 rolls 3
      .mockReturnValueOnce(0.0) // Player 2 rolls 1
      .mockReturnValueOnce(0.5); // Player 1 rolls 4
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");
    game.takeTurn("Player 2");
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

describe("Feature 3: Turns & Multiple Players", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("3.1: after Player 1 rolls, it is Player 2's turn", () => {
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");

    expect(game.getCurrentPlayer()).toBe("Player 2");
  });

  it("3.2: after Player 2 rolls, it is Player 1's turn again", () => {
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");
    game.takeTurn("Player 2");

    expect(game.getCurrentPlayer()).toBe("Player 1");
  });

  it("3.3: Player 1 rolling a 3 does not move Player 2", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");

    expect(game.getPosition("Player 1")).toBe(4);
    expect(game.getPosition("Player 2")).toBe(1);
  });

  it("a player cannot take two turns in a row", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    const game = new Game(["Player 1", "Player 2"]);

    game.takeTurn("Player 1");

    expect(() => game.takeTurn("Player 1")).toThrow("It's not Player 1's turn");
    expect(game.getPosition("Player 1")).toBe(4);
  });

  it("an unknown player cannot take a turn", () => {
    const game = new Game(["Player 1", "Player 2"]);

    expect(() => game.takeTurn("Player 3")).toThrow(
      "Player Player 3 does not exist.",
    );
  });
});

describe("Setup validation", () => {
  it("a game cannot be created with fewer than two players", () => {
    expect(() => new Game(["Player 1"])).toThrow(
      "A game needs at least two players.",
    );
  });

  it("a game cannot be created with duplicate player names", () => {
    expect(() => new Game(["Bob", "Bob"])).toThrow(
      "Player names must be unique.",
    );
  });

  it("a player cannot start outside squares 1 to 99", () => {
    expect(
      () => new Game(["Player 1", "Player 2"], new Map([["Player 1", 100]])),
    ).toThrow("Invalid starting square for Player 1: 100");
    expect(
      () => new Game(["Player 1", "Player 2"], new Map([["Player 1", 0]])),
    ).toThrow("Invalid starting square for Player 1: 0");
  });
});
