import { Cell } from './Cell';
import { DirectionalCell } from './DirectionalCell';

export class PusherCell extends DirectionalCell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(20, 100, 200)';
    }

    // A pusher cell can only be pushed in a direction not opposite to it
    movementDirCheck(grid, sourceCell) { return sourceCell.dir !== this.dir && sourceCell.dir % 2 === this.dir % 2; }

    incrementX(grid, sourceCell) {
        if (this.movementDirCheck(grid, sourceCell)) return false;
        return super.incrementX(grid, sourceCell);
    }

    decrementX(grid, sourceCell) {
        if (this.movementDirCheck(grid, sourceCell)) return false;
        return super.decrementX(grid, sourceCell);
    }

    incrementY(grid, sourceCell) {
        if (this.movementDirCheck(grid, sourceCell)) return false;
        return super.incrementY(grid, sourceCell);
    }

    decrementY(grid, sourceCell) {
        if (this.movementDirCheck(grid, sourceCell)) return false;
        return super.decrementY(grid, sourceCell);
    }

    // The pusher cell moves itself and other cells
    update(grid) {
        switch (this.dir) {
            case 0:
                this.decrementY(grid, this);
                break;
            case 1:
                this.incrementX(grid, this);
                break;
            case 2:
                this.incrementY(grid, this);
                break;
            case 3:
                this.decrementX(grid, this);
                break;
        }
    }
}
