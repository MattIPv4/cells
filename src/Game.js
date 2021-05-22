import { Cell } from './cells/Cell';
import { DestroyerCell } from './cells/DestroyerCell';
import { DuplicatorCell } from './cells/DuplicatorCell';
import { ImmovableCell } from './cells/ImmovableCell';
import { MoverCell } from './cells/MoverCell';
import { PusherCell } from './cells/PusherCell';
import { RotatorCell } from './cells/RotatorCell';

const cells = [Cell, DestroyerCell, DuplicatorCell, ImmovableCell, MoverCell, PusherCell, RotatorCell];

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
    BORDER_RADIUS = 4;
    GRID_GAP = 4;

    constructor(grid, tps = 5, fps = 60) {
        this.grid = grid;

        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.mouse = {
            x: 0,
            y: 0,
        };

        this.canvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
        window.addEventListener('keydown', this.keyDown.bind(this), true);

        this.doUpdate = true;
        this.lastUpdate = 0;
        this.tps = tps;

        this.lastRender = 0;
        this.fps = fps;

        window.requestAnimationFrame(this.updateLoop.bind(this));
        window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    update() {
        if (!this.doUpdate) return;

        // Define the priority order for cell type updates
        const order = [
            // These update the cell with them at the end of the last cycle
            'DuplicatorCell', 'RotatorCell',
            // These update the cell with them now
            'PusherCell', 'MoverCell', 'DestroyerCell',
        ];
        const orderSort = (a, b) => order.indexOf(a.constructor.name) > order.indexOf(b.constructor.name) ? 1 : -1;

        // Update cells by type
        for (const cell of [...this.grid.cells.values()].sort(orderSort)) {
            cell.update(this.grid);
        }
    }

    updateLoop() {
        this.lastUpdate = Date.now();
        this.update();

        setTimeout(
            () => window.requestAnimationFrame(this.updateLoop.bind(this)),
            (1000 / this.tps) - (Date.now() - this.lastUpdate),
        );
    }

    render() {
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
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                this.ctx.beginPath();
                this.ctx.roundRect(
                    x * size + this.GRID_GAP,
                    y * size + this.GRID_GAP,
                    size - this.GRID_GAP * 2,
                    size - this.GRID_GAP * 2,
                    this.BORDER_RADIUS,
                );
                this.ctx.fillStyle = 'rgb(30, 30, 40)';
                this.ctx.fill();
            }
        }

        // Draw the cells
        for (const cell of this.grid.cells) {
            cell.render(this, size);
        }

        // Draw the mouse
        this.ctx.beginPath();
        this.ctx.roundRect(
            this.mouse.x * size,
            this.mouse.y * size,
            size,
            size,
            this.BORDER_RADIUS,
        );
        this.ctx.fillStyle = 'rgba(200, 10, 100, 0.5)';
        this.ctx.fill();
        this.ctx.lineWidth = size * 0.1;
        this.ctx.strokeStyle = 'rgba(200, 10, 100, 0.75)';
        this.ctx.stroke();
    }

    renderLoop() {
        this.lastRender = Date.now();
        this.render();

        setTimeout(
            () => window.requestAnimationFrame(this.renderLoop.bind(this)),
            (1000 / this.fps) - (Date.now() - this.lastRender),
        );
    }

    mouseMove(event) {
        const canvasSize = this.canvas.getBoundingClientRect();
        const size = Math.min(canvasSize.width / this.grid.width, canvasSize.height / this.grid.height);
        this.mouse.x = Math.floor((event.clientX - canvasSize.left) / size);
        this.mouse.y = Math.floor((event.clientY - canvasSize.top) / size);
    }

    keyDown(event) {
        console.log(event.key);

        switch (event.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7': {
                const collisionCell = this.grid.cellAt(this.mouse.x, this.mouse.y);
                if (!collisionCell) {
                    const cell = cells[parseInt(event.key, 10) - 1];
                    this.grid.cells.add(new cell(this.mouse.x, this.mouse.y));
                }
                break;
            }

            case 'Backspace': {
                const collisionCell = this.grid.cellAt(this.mouse.x, this.mouse.y);
                if (collisionCell) this.grid.cells.delete(collisionCell);
                break;
            }

            case 'r': {
                const collisionCell = this.grid.cellAt(this.mouse.x, this.mouse.y);
                if (collisionCell && typeof collisionCell.rotateClockwise === 'function')
                    collisionCell.rotateClockwise();
                break;
            }

            case ' ': {
                this.doUpdate = !this.doUpdate;
                break;
            }

            case 'ArrowUp': {
                this.tps = this.tps * 2;
                break;
            }

            case 'ArrowDown': {
                this.tps = Math.max(Math.round(this.tps / 2), 1);
                break;
            }
        }
    }
}
