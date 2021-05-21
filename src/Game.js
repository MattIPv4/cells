// Polyfill roundedRect
// Thanks https://stackoverflow.com/a/7838871/5577674
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

export class Game {
    constructor(grid, fps = 5) {
        this.grid = grid;

        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.lastFrame = 0;
        this.fps = fps;

        window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    render() {
        // Update cells
        for (const cell of this.grid.cells) {
            cell.update(this.grid);
        }

        // Set canvas size
        const canvasSize = this.canvas.getBoundingClientRect();
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;

        // Determine cell size
        const size = Math.min(canvasSize.width / this.grid.width, canvasSize.height / this.grid.height);

        // Clear the screen
        this.ctx.fillStyle = 'rgb(10, 10, 20)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the base grid
        const gap = 2;
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                this.ctx.beginPath();
                this.ctx.roundRect(
                    x * size + gap,
                    y * size + gap,
                    size - gap * 2,
                    size - gap * 2,
                    4,
                );
                this.ctx.fillStyle = 'rgb(30, 30, 40)';
                this.ctx.fill();
            }
        }

        // Draw the cells
        for (const cell of this.grid.cells) {
            this.ctx.beginPath();
            this.ctx.roundRect(
                cell.x * size,
                cell.y * size,
                size,
                size,
                4,
            );
            this.ctx.fillStyle = cell.color;
            this.ctx.fill();

            this.ctx.translate(cell.x * size + size * 0.5, cell.y * size + size * 0.5);
            this.ctx.rotate(cell.dir * 0.5 * Math.PI);
            this.ctx.translate(-1 * (cell.x * size + size * 0.5), -1 * (cell.y * size + size * 0.5));

            this.ctx.beginPath();
            this.ctx.moveTo(cell.x * size + size * 0.1, cell.y * size + size * 0.7);
            this.ctx.lineTo(cell.x * size + size * 0.9, cell.y * size + size * 0.7);
            this.ctx.lineTo(cell.x * size + size * 0.5, cell.y * size + size * 0.3);
            this.ctx.fillStyle = 'rgb(255, 255, 255)';
            this.ctx.fill();

            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    renderLoop() {
        this.lastFrame = Date.now();
        this.render();

        setTimeout(
            () => window.requestAnimationFrame(this.renderLoop.bind(this)),
            (1000 / this.fps) - (Date.now() - this.lastFrame),
        );
    };
}