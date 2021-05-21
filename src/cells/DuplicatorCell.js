import { DirectionalCell } from './DirectionalCell';

export class DuplicatorCell extends DirectionalCell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(200, 180, 20)';
    }

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

    duplicateCell(grid, sourceCell) {
        const newCell = sourceCell.duplicate();
        grid.cells.add(newCell);
        return newCell;
    }

    duplicateToPositiveX(grid) {
        const sourceCell = grid.cellAt(this.decrementedX(grid), this.y);
        if (!sourceCell) return false;

        // If the new cell will collide with a cell, move that cell
        const collisionCell = grid.cellAt(this.incrementedX(grid), this.y);
        if (collisionCell && !collisionCell.incrementX(grid, this)) return false;

        this.duplicateCell(grid, sourceCell).x = this.incrementedX(grid);
        return true;
    }

    duplicateToNegativeX(grid) {
        const sourceCell = grid.cellAt(this.incrementedX(grid), this.y);
        if (!sourceCell) return false;

        // If the new cell will collide with a cell, move that cell
        const collisionCell = grid.cellAt(this.decrementedX(grid), this.y);
        if (collisionCell && !collisionCell.decrementX(grid, this)) return false;

        this.duplicateCell(grid, sourceCell).x = this.decrementedX(grid);
        return true;
    }

    duplicateToPositiveY(grid) {
        const sourceCell = grid.cellAt(this.x, this.decrementedY(grid));
        if (!sourceCell) return false;

        // If the new cell will collide with a cell, move that cell
        const collisionCell = grid.cellAt(this.x, this.incrementedY(grid));
        if (collisionCell && !collisionCell.incrementY(grid, this)) return false;

        this.duplicateCell(grid, sourceCell).y = this.incrementedY(grid);
        return true;
    }

    duplicateToNegativeY(grid) {
        const sourceCell = grid.cellAt(this.x, this.incrementedY(grid));
        if (!sourceCell) return false;

        // If the new cell will collide with a cell, move that cell
        const collisionCell = grid.cellAt(this.x, this.decrementedY(grid));
        if (collisionCell && !collisionCell.decrementY(grid, this)) return false;

        this.duplicateCell(grid, sourceCell).y = this.decrementedY(grid);
        return true;
    }
}
