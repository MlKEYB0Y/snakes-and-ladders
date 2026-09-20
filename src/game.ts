export class Game{
    positions = new Map<string, number>();
    
    constructor(names: string[]){

        for (const name of names) {
            this.positions.set(name, 1);
        }
    }
    getPosition(name: string): number {
        const position = this.positions.get(name);
        if (position === undefined) {
            throw new Error(`Player ${name} does not exist.`);
        }
        return position;
    }
    move(name: string, roll: number): void {
        const currentPosition = this.getPosition(name);
        const newPosition = currentPosition + roll;
        this.positions.set(name, newPosition);
    }


}