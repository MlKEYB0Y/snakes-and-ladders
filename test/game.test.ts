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
});
