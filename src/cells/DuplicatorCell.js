import { PusherCell } from './PusherCell';

export class DuplicatorCell extends PusherCell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(200, 150, 20)';
    }

    // The duplicator pushes a cell in front of it, if there is a cell behind it to duplicate
    update(grid) {
        switch (this.dir) {
            case 0:
                this.duplicateToNegativeY(grid);
                break;
            case 1:
                this.duplicateToPositiveX(grid);
                break;
            case 2:
                this.duplicateToPositiveY(grid);
                break;
            case 3:
                this.duplicateToNegativeX(grid);
                break;
        }
    }

    opposingForceCheck(grid, sourceCell, pushingCells) {
        // Duplicators don't contribute to opposing forces
        return true;
    }

    duplicateCell(grid, sourceCell) {
        const newCell = sourceCell.duplicate();
        grid.cells.add(newCell);
        return newCell;
    }

    cellToDuplicate(grid) {
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

    duplicateToPositiveX(grid) {
        const sourceCell = this.cellToDuplicate(grid);
        if (!sourceCell) return false;

        // Attempt to push the cell that a new cell would collide with
        if (!this.pushPositiveX(grid)) return false;

        this.duplicateCell(grid, sourceCell).x = this.incrementedX(grid);
        return true;
    }

    duplicateToNegativeX(grid) {
        const sourceCell = this.cellToDuplicate(grid);
        if (!sourceCell) return false;

        // Attempt to push the cell that a new cell would collide with
        if (!this.pushNegativeX(grid)) return false;

        this.duplicateCell(grid, sourceCell).x = this.decrementedX(grid);
        return true;
    }

    duplicateToPositiveY(grid) {
        const sourceCell = this.cellToDuplicate(grid);
        if (!sourceCell) return false;

        // Attempt to push the cell that a new cell would collide with
        if (!this.pushPositiveY(grid)) return false;

        this.duplicateCell(grid, sourceCell).y = this.incrementedY(grid);
        return true;
    }

    duplicateToNegativeY(grid) {
        const sourceCell = this.cellToDuplicate(grid);
        if (!sourceCell) return false;

        // Attempt to push the cell that a new cell would collide with
        if (!this.pushNegativeY(grid)) return false;

        this.duplicateCell(grid, sourceCell).y = this.decrementedY(grid);
        return true;
    }
}
