import { rollDie } from './dice.js';

export class Game{
    positions = new Map<string, number>();
  

    constructor(names: string[], startingPositions: Map<string, number> = new Map()) {
    


        for (const name of names) {
            this.positions.set(name, startingPositions.get(name) || 1);
        }
    }
    getPosition(name: string): number {
        const position = this.positions.get(name);
        if (position === undefined) {
            throw new Error(`Player ${name} does not exist.`);
        }
        return position;
    }
    private move(name: string, roll: number): void {
        const currentPosition = this.getPosition(name);
        const newPosition = currentPosition + roll;
        this.positions.set(name, newPosition);
    }

    takeTurn(name: string): string | undefined {
        const roll = rollDie();
        this.move(name, roll);

        if (this.hasWon(name)) {
            return (`${name} wins`);
    
       
        } return undefined;}

       

         hasWon(name: string): boolean {
            if (this.getPosition(name) >= 100) {
                return true;
            }
            return false;
        }

    
    }

