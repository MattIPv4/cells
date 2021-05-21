import { Cell } from './Cell';

export class ImmovableCell extends Cell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(50, 50, 50)';
    }

    render(game, size) {
        super.render(game, size);

        game.ctx.beginPath();
        game.ctx.moveTo(this.x * size + size * 0.2, this.y * size + size * 0.2);
        game.ctx.lineTo(this.x * size + size * 0.8, this.y * size + size * 0.8);
        game.ctx.lineWidth = size * 0.1;
        game.ctx.strokeStyle = 'rgb(30, 30, 30)';
        game.ctx.stroke();

        game.ctx.beginPath();
        game.ctx.moveTo(this.x * size + size * 0.8, this.y * size + size * 0.2);
        game.ctx.lineTo(this.x * size + size * 0.2, this.y * size + size * 0.8);
        game.ctx.lineWidth = size * 0.1;
        game.ctx.strokeStyle = 'rgb(30, 30, 30)';
        game.ctx.stroke();
    }

    // The immovable cell cannot be moved
    incrementX(grid, sourceCell) { return false; }
    decrementX(grid, sourceCell) { return false; }
    incrementY(grid, sourceCell) { return false; }
    decrementY(grid, sourceCell) { return false; }
}
