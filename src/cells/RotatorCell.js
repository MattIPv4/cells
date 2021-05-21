import { Cell } from './Cell';

export class RotatorCell extends Cell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(20, 200, 100)';
    }

    update(grid) {
        const neighbours = [
            grid.cellAt(this.x, this.y - 1),
            grid.cellAt(this.x, this.y + 1),
            grid.cellAt(this.x - 1, this.y),
            grid.cellAt(this.x + 1, this.y),
        ];
        for (const cell of neighbours) {
            if (cell) {
                if (this.dir % 2 === 0) cell.rotateClockwise();
                else cell.rotateAntiClockwise();
            }
        }
    }
}
