import { afterEach, describe, expect, it, vi } from "vitest";
import { rollDie } from "../src/dice.js";

describe("Dice: rollDie", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps Math.random()'s output to a die value from 1 to 6", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    expect(rollDie()).toBe(4);
  });

  it("maps the lowest possible Math.random() value (0) to 1", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(rollDie()).toBe(1);
  });

  it("maps a Math.random() value just below 1 to 6", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);

    expect(rollDie()).toBe(6);
  });
});
