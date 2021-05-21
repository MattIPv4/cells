import { Cell } from './Cell';

export class DirectionalCell extends Cell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y);
        this.dir = dir;
    }

    duplicate() {
        return new this.constructor(this.x, this.y, this.dir);
    }

    render(game, size) {
        super.render(game, size);

        game.ctx.translate(this.x * size + size * 0.5, this.y * size + size * 0.5);
        game.ctx.rotate(this.dir * 0.5 * Math.PI);
        game.ctx.translate(-1 * (this.x * size + size * 0.5), -1 * (this.y * size + size * 0.5));

        game.ctx.beginPath();
        game.ctx.moveTo(this.x * size + size * 0.1, this.y * size + size * 0.7);
        game.ctx.lineTo(this.x * size + size * 0.9, this.y * size + size * 0.7);
        game.ctx.lineTo(this.x * size + size * 0.5, this.y * size + size * 0.3);
        game.ctx.fillStyle = 'rgb(255, 255, 255)';
        game.ctx.fill();

        game.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    rotatedClockwise() { return this.dir >= 3 ? 0 : this.dir + 1; }
    rotateClockwise() { this.dir = this.rotatedClockwise(); return true; }

    rotatedAntiClockwise() { return this.dir < 0 ? 3 : this.dir - 1; }
    rotateAntiClockwise() { this.dir = this.rotatedAntiClockwise(); return true; }
}
