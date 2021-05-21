export class Cell {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.color = 'rgb(150, 150, 170)';
    }

    duplicate() {
        return new this.constructor(this.x, this.y);
    }

    render(game, size) {
        game.ctx.beginPath();
        game.ctx.roundRect(
            this.x * size,
            this.y * size,
            size,
            size,
            game.BORDER_RADIUS,
        );
        game.ctx.fillStyle = this.color;
        game.ctx.fill();
    }

    update(grid) {
        // The default cell does nothing, it just exists
    }

    incrementedX(grid) { return this.x >= grid.width - 1 ? 0 : this.x + 1; }
    incrementX(grid, sourceCell) {
        const newX = this.incrementedX(grid);

        // If hitting source cell, abort
        if (newX === sourceCell.x) return false;

        // If this cell moving will collide with another, move it too
        const collisionCell = grid.cellAt(newX, this.y);
        if (collisionCell && !collisionCell.incrementX(grid, sourceCell)) return false;

        this.x = newX;
        return true;
    }

    decrementedX(grid) { return this.x < 0 ? grid.width - 1 : this.x - 1; }
    decrementX(grid, sourceCell) {
        const newX = this.decrementedX(grid);

        // If hitting source cell, abort
        if (newX === sourceCell.x) return false;

        // If this cell moving will collide with another, move it too
        const collisionCell = grid.cellAt(newX, this.y);
        if (collisionCell && !collisionCell.decrementX(grid, sourceCell)) return false;

        this.x = newX;
        return true;
    }

    incrementedY(grid) { return this.y === grid.height - 1 ? 0 : this.y + 1; }
    incrementY(grid, sourceCell) {
        const newY = this.incrementedY(grid);

        // If hitting source cell, abort
        if (newY === sourceCell.y) return false;

        // If this cell moving will collide with another, move it too
        const collisionCell = grid.cellAt(this.x, newY);
        if (collisionCell && !collisionCell.incrementY(grid, sourceCell)) return false;

        this.y = newY;
        return true;
    }

    decrementedY(grid) { return this.y === 0 ? grid.height - 1 : this.y - 1; }
    decrementY(grid, sourceCell) {
        const newY = this.decrementedY(grid);

        // If hitting source cell, abort
        if (newY === sourceCell.y) return false;

        // If this cell moving will collide with another, move it too
        const collisionCell = grid.cellAt(this.x, newY);
        if (collisionCell && !collisionCell.decrementY(grid, sourceCell)) return false;

        this.y = newY;
        return true;
    }
}
