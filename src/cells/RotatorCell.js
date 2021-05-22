import { Cell } from './Cell';
import { DirectionalCell } from './DirectionalCell';

export class RotatorCell extends Cell {
    constructor(x = 0, y = 0, antiClockwise = false) {
        super(x, y);
        this.antiClockwise = antiClockwise;
        this.color = 'rgb(20, 200, 100)';
    }

    duplicate() {
        return new this.constructor(this.x, this.y, this.antiClockwise);
    }

    render(game, size) {
        super.render(game, size);

        game.ctx.beginPath();
        game.ctx.arc(
            this.x * size + size * 0.5,
            this.y * size + size * 0.5,
            size * 0.3,
            this.antiClockwise ? 1.5 * Math.PI : 0,
            this.antiClockwise ? Math.PI: 1.5 * Math.PI,
        );
        game.ctx.lineWidth = size * 0.1;
        game.ctx.strokeStyle = 'rgb(255, 255, 255)';
        game.ctx.stroke();

        game.ctx.beginPath();
        game.ctx.moveTo(this.x * size + size * 0.5, this.y * size + size * 0.05);
        game.ctx.lineTo(this.x * size + size * 0.5, this.y * size + size * 0.4);
        game.ctx.lineTo(this.x * size + size * (this.antiClockwise ? 0.3 : 0.7), this.y * size + size * 0.225);
        game.ctx.fillStyle = 'rgb(255, 255, 255)';
        game.ctx.fill();
    }

    update(grid) {
        const neighbours = [
            grid.cellAt(this.x, this.y - 1),
            grid.cellAt(this.x, this.y + 1),
            grid.cellAt(this.x - 1, this.y),
            grid.cellAt(this.x + 1, this.y),
        ];
        for (const cell of neighbours) {
            if (cell && typeof cell.rotateClockwise === 'function') {
                if (this.antiClockwise) cell.rotateAntiClockwise();
                else cell.rotateClockwise();
            }
        }
    }

    // Rotator cells can flip each other
    rotateClockwise() { this.antiClockwise = !this.antiClockwise; return true; }
    rotateAntiClockwise() { this.antiClockwise = !this.antiClockwise; return true; }
}
