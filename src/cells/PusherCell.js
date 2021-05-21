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

    // The pusher cell moves other cells
    update(grid) {
        switch (this.dir) {
            case 0:
                this.pushNegativeY(grid);
                break;
            case 1:
                this.pushPositiveX(grid);
                break;
            case 2:
                this.pushPositiveY(grid);
                break;
            case 3:
                this.pushNegativeX(grid);
                break;
        }
    }

    pushPositiveX(grid) {
        const targetCell = grid.cellAt(this.incrementedX(grid), this.y)
        if (!targetCell) return false;
        targetCell.incrementX(grid, this);
    }

    pushNegativeX(grid) {
        const targetCell = grid.cellAt(this.decrementedX(grid), this.y)
        if (!targetCell) return false;
        targetCell.decrementX(grid, this);
    }

    pushPositiveY(grid) {
        const targetCell = grid.cellAt(this.x, this.incrementedY(grid))
        if (!targetCell) return false;
        targetCell.incrementY(grid, this);
    }

    pushNegativeY(grid) {
        const targetCell = grid.cellAt(this.x, this.decrementedY(grid))
        if (!targetCell) return false;
        targetCell.decrementY(grid, this);
    }
}
