import { Cell } from './Cell';

export class VoidCell extends Cell {
    constructor(x = 0, y = 0) {
        super(x, y);
        this.color = 'rgb(10, 10, 30)';
    }

    render(game, size) {
        super.render(game, size);

        game.ctx.beginPath();
        game.ctx.arc(
            this.x * size + size * 0.5,
            this.y * size + size * 0.5,
            size * 0.3,
            0,
            2 * Math.PI,
        );
        game.ctx.lineWidth = size * 0.1;
        game.ctx.strokeStyle = 'rgb(100, 100, 120)';
        game.ctx.stroke();

        game.ctx.beginPath();
        game.ctx.arc(
            this.x * size + size * 0.5,
            this.y * size + size * 0.5,
            size * 0.1,
            0,
            2 * Math.PI,
        );
        game.ctx.lineWidth = size * 0.05;
        game.ctx.strokeStyle = 'rgb(100, 100, 120)';
        game.ctx.stroke();
    }

    update(grid) {
        const neighbours = [
            grid.cellAt(this.x - 1, this.y - 1),
            grid.cellAt(this.x, this.y - 1),
            grid.cellAt(this.x + 1, this.y - 1),

            grid.cellAt(this.x - 1, this.y),
            grid.cellAt(this.x + 1, this.y),

            grid.cellAt(this.x - 1, this.y + 1),
            grid.cellAt(this.x, this.y + 1),
            grid.cellAt(this.x + 1, this.y + 1),
        ];
        for (const cell of neighbours) {
            // Void cells don't destroy each other
            if (cell && !(cell instanceof VoidCell)) grid.cells.delete(cell);
        }
    }
}
