import { rollDie } from "./dice.js";

export class Game {
  private gameOver = false;
  private players: string[] = [];
  private currentPlayerIndex = 0;
  private positions = new Map<string, number>();

  constructor(
    names: string[],
    startingPositions: Map<string, number> = new Map(),
  ) {
    this.validateSetup(names, startingPositions);

    for (const name of names) {
      this.positions.set(name, startingPositions.get(name) || 1);
    }

    this.players = [...names];
  }

  private validateSetup(
    names: string[],
    startingPositions: Map<string, number>,
  ): void {
    if (names.length < 2) {
      throw new Error("A game needs at least two players.");
    }
    if (new Set(names).size !== names.length) {
      throw new Error("Player names must be unique.");
    }
    for (const [name, square] of startingPositions) {
      if (square < 1 || square > 99) {
        throw new Error(`Invalid starting square for ${name}: ${square}`);
      }
    }
  }
  getPosition(name: string): number {
    const position = this.positions.get(name);
    if (position === undefined) {
      throw new Error(`Player ${name} does not exist.`);
    }
    return position;
  }
  getCurrentPlayer(): string {
    return this.players[this.currentPlayerIndex];
  }
  private move(name: string, roll: number): void {
    const currentPosition = this.getPosition(name);
    let newPosition = currentPosition + roll;
    if (newPosition > 100) {
      newPosition = 100 - (newPosition - 100);
    }
    this.positions.set(name, newPosition);
  }

  takeTurn(name: string): string | undefined {
    if (this.gameOver) {
      throw new Error("Game is over.");
    }
    this.getPosition(name);
    if (name !== this.getCurrentPlayer()) {
      throw new Error(`It's not ${name}'s turn.`);
    }
    const roll = rollDie();
    this.move(name, roll);
    this.currentPlayerIndex = this.currentPlayerIndex + 1;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }

    if (this.hasWon(name)) {
      this.gameOver = true;
      return `${name} wins`;
    }
    return undefined;
  }

  hasWon(name: string): boolean {
    if (this.getPosition(name) >= 100) {
      return true;
    }
    return false;
  }
}
