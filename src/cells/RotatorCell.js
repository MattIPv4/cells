import { Cell } from './Cell';
import { DirectionalCell } from './DirectionalCell';

export class RotatorCell extends Cell {
    constructor(x = 0, y = 0, antiClockwise = false) {
        super(x, y);
        this.antiClockwise = antiClockwise;
        this.color = 'rgb(20, 200, 100)';
    }

    duplicate() {
        return new this.constructor(this.x, this.y, this.antiClockwise);
    }

    update(grid) {
        const neighbours = [
            grid.cellAt(this.x, this.y - 1),
            grid.cellAt(this.x, this.y + 1),
            grid.cellAt(this.x - 1, this.y),
            grid.cellAt(this.x + 1, this.y),
        ];
        for (const cell of neighbours) {
            if (cell && cell instanceof DirectionalCell) {
                if (this.antiClockwise) cell.rotateAntiClockwise();
                else cell.rotateClockwise();
            }
        }
    }
}
