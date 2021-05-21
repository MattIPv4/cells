import { Cell } from './Cell';

export class DestroyerCell extends Cell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(200, 20, 20)';
    }

    update(grid) {
        switch (this.dir) {
            case 0:
                this.destroyNegativeY(grid);
                break;
            case 1:
                this.destroyPositiveX(grid);
                break;
            case 2:
                this.destroyPositiveY(grid);
                break;
            case 3:
                this.destroyNegativeX(grid);
                break;
        }
    }

    destroyCell(grid, x, y) {
        const targetCell = grid.cellAt(x, y);
        if (!targetCell) return false;
        grid.cells.delete(targetCell);
        return true;
    }

    destroyPositiveX(grid) {
        return this.destroyCell(grid, this.incrementedX(grid), this.y);
    }

    destroyNegativeX(grid) {
        return this.destroyCell(grid, this.decrementedX(grid), this.y);
    }

    destroyPositiveY(grid) {
        return this.destroyCell(grid, this.x, this.incrementedY(grid));
    }

    destroyNegativeY(grid) {
        return this.destroyCell(grid, this.x, this.decrementedY(grid));
    }
}
