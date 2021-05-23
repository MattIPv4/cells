import { PusherCell } from './PusherCell';

export class SuckerCell extends PusherCell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(250, 100, 20)';
    }

    // The sucker pushes a cell in front of it, if there is a cell behind it to suck
    update(grid) {
        switch (this.dir) {
            case 0:
                this.suckToNegativeY(grid);
                break;
            case 1:
                this.suckToPositiveX(grid);
                break;
            case 2:
                this.suckToPositiveY(grid);
                break;
            case 3:
                this.suckToNegativeX(grid);
                break;
        }
    }

    opposingForceCheck(grid, targetCell, pushingCells) {
        // Only consider forces if this cell is actively sucking
        if (!this.cellToSuck(grid)) return true;

        // If there is something to dupe, consider forces
        return super.opposingForceCheck(grid, targetCell, pushingCells);
    }

    cellToSuck(grid) {
        switch (this.dir) {
            case 0:
                return grid.cellAt(this.x, this.incrementedY(grid));
            case 1:
                return grid.cellAt(this.decrementedX(grid), this.y);
            case 2:
                return grid.cellAt(this.x, this.decrementedY(grid));
            case 3:
                return grid.cellAt(this.incrementedX(grid), this.y);
        }
    }

    suckToPositiveX(grid) {
        const targetCell = this.cellToSuck(grid);
        if (!targetCell) return false;

        // Attempt to push the cell that this cell would collide with
        if (!this.pushPositiveX(grid)) return false;

        targetCell.x = this.incrementedX(grid);
        return true;
    }

    suckToNegativeX(grid) {
        const targetCell = this.cellToSuck(grid);
        if (!targetCell) return false;

        // Attempt to push the cell that this cell would collide with
        if (!this.pushNegativeX(grid)) return false;

        targetCell.x = this.decrementedX(grid);
        return true;
    }

    suckToPositiveY(grid) {
        const targetCell = this.cellToSuck(grid);
        if (!targetCell) return false;

        // Attempt to push the cell that this cell would collide with
        if (!this.pushPositiveY(grid)) return false;

        targetCell.y = this.incrementedY(grid);
        return true;
    }

    suckToNegativeY(grid) {
        const targetCell = this.cellToSuck(grid);
        if (!targetCell) return false;

        // Attempt to push the cell that this cell would collide with
        if (!this.pushNegativeY(grid)) return false;

        targetCell.y = this.decrementedY(grid);
        return true;
    }
}
