import { Cell } from './Cell';
import { DirectionalCell } from './DirectionalCell';

const originalIncrementX = Cell.prototype.incrementX;
Cell.prototype.incrementX = function (grid, sourceCell, pushingCells, ...args) {
    const newX = this.incrementedX(grid);

    // If we've reached the source cell, check to see if there if a remaining push force
    if (newX === sourceCell.x && pushingCells) {
        if (pushingCells[sourceCell.dir] > pushingCells[(sourceCell.dir + 2) % 4]) {
            // Apply the new position but don't recurse further
            this.x = newX;
            return true;
        }
        return false;
    }

    return originalIncrementX.call(this, grid, sourceCell, pushingCells, ...args);
};

const originalIncrementY = Cell.prototype.incrementY;
Cell.prototype.incrementY = function (grid, sourceCell, pushingCells, ...args) {
    const newY = this.incrementedY(grid);

    // If we've reached the source cell, check to see if there if a remaining push force
    if (newY === sourceCell.y && pushingCells) {
        if (pushingCells[sourceCell.dir] > pushingCells[(sourceCell.dir + 2) % 4]) {
            // Apply the new position but don't recurse further
            this.y = newY;
            return true;
        }
        return false;
    }

    return originalIncrementY.call(this, grid, sourceCell, pushingCells, ...args);
};

const originalDecrementX = Cell.prototype.decrementX;
Cell.prototype.decrementX = function (grid, sourceCell, pushingCells, ...args) {
    const newX = this.decrementedX(grid);

    // If we've reached the source cell, check to see if there if a remaining push force
    if (newX === sourceCell.x && pushingCells) {
        if (pushingCells[sourceCell.dir] > pushingCells[(sourceCell.dir + 2) % 4]) {
            // Apply the new position but don't recurse further
            this.x = newX;
            return true;
        }
        return false;
    }

    return originalDecrementX.call(this, grid, sourceCell, pushingCells, ...args);
};

const originalDecrementY = Cell.prototype.decrementY;
Cell.prototype.decrementY = function (grid, sourceCell, pushingCells, ...args) {
    const newY = this.decrementedY(grid);

    // If we've reached the source cell, check to see if there if a remaining push force
    if (newY === sourceCell.y && pushingCells) {
        if (pushingCells[sourceCell.dir] > pushingCells[(sourceCell.dir + 2) % 4]) {
            // Apply the new position but don't recurse further
            this.y = newY;
            return true;
        }
        return false;
    }

    return originalDecrementY.call(this, grid, sourceCell, pushingCells, ...args);
};

export class PusherCell extends DirectionalCell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(20, 100, 200)';
    }

    opposingForceCheck(grid, sourceCell, pushingCells) {
        // Add this cell to the pushing cells
        pushingCells[this.dir]++;

        // Calculate the opposing direction to this cell
        const oppositeDir = (this.dir + 2) % 4;

        // If this cell is the opposite direction to the source, check push forces
        if (sourceCell.dir === oppositeDir) {
            // If the forces are in favour of the source cell, this cell can move
            return pushingCells[sourceCell.dir] > pushingCells[this.dir];
        }

        // This cell isn't in an opposing direction, it can be moved
        return true;
    }

    incrementX(grid, sourceCell, pushingCells = null) {
        pushingCells = pushingCells || this.pushEmptyForce();
        if (!this.opposingForceCheck(grid, sourceCell, pushingCells)) return false;
        return super.incrementX(grid, sourceCell, pushingCells);
    }

    decrementX(grid, sourceCell, pushingCells = null) {
        pushingCells = pushingCells || this.pushEmptyForce();
        if (!this.opposingForceCheck(grid, sourceCell, pushingCells)) return false;
        return super.decrementX(grid, sourceCell, pushingCells);
    }

    incrementY(grid, sourceCell, pushingCells = null) {
        pushingCells = pushingCells || this.pushEmptyForce();
        if (!this.opposingForceCheck(grid, sourceCell, pushingCells)) return false;
        return super.incrementY(grid, sourceCell, pushingCells);
    }

    decrementY(grid, sourceCell, pushingCells = null) {
        pushingCells = pushingCells || this.pushEmptyForce();
        if (!this.opposingForceCheck(grid, sourceCell, pushingCells)) return false;
        return super.decrementY(grid, sourceCell, pushingCells);
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

    pushEmptyForce() {
        return { 0: 0, 1: 0, 2: 0, 3: 0 };
    }

    pushInitialForce() {
        return Object.assign(this.pushEmptyForce(), { [this.dir]: 1 });
    }

    pushPositiveX(grid) {
        const targetCell = grid.cellAt(this.incrementedX(grid), this.y)
        if (!targetCell) return true;
        return targetCell.incrementX(grid, this, this.pushInitialForce());
    }

    pushNegativeX(grid) {
        const targetCell = grid.cellAt(this.decrementedX(grid), this.y)
        if (!targetCell) return true;
        return targetCell.decrementX(grid, this, this.pushInitialForce());
    }

    pushPositiveY(grid) {
        const targetCell = grid.cellAt(this.x, this.incrementedY(grid))
        if (!targetCell) return true;
        return targetCell.incrementY(grid, this, this.pushInitialForce());
    }

    pushNegativeY(grid) {
        const targetCell = grid.cellAt(this.x, this.decrementedY(grid))
        if (!targetCell) return true;
        return targetCell.decrementY(grid, this, this.pushInitialForce());
    }
}
