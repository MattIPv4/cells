export class Grid {
    constructor(width, height, cells = new Set()) {
        this.width = width;
        this.height = height;
        this.cells = cells;
    }

    cellAt(x, y) {
        for (const cell of this.cells)
            if (cell.x === x && cell.y === y)
                return cell
    }
}
