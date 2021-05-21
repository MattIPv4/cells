import { Cell } from './Cell';

export class ImmovableCell extends Cell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(50, 50, 50)';
    }

    // The immovable cell cannot be moved
    incrementX(grid, sourceCell) { return false; }
    decrementX(grid, sourceCell) { return false; }
    incrementY(grid, sourceCell) { return false; }
    decrementY(grid, sourceCell) { return false; }
}
