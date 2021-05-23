import { RotatorCell } from './RotatorCell';
import { ImmovableCell } from "./ImmovableCell";

const wrapVal = (val, min, max) => {
    while (val < min) val += max;
    while (val >= max) val -= max;
    return val;
};

export class TranslocatorCell extends RotatorCell {
    constructor(x = 0, y = 0, antiClockwise = false) {
        super(x, y, antiClockwise);
        this.color = 'rgb(20, 100, 50)';
    }

    update(grid) {
        const neighbours = [
            [this.x, wrapVal(this.y - 1, 0, grid.height)],
            [wrapVal(this.x + 1, 0, grid.width), this.y],
            [this.x, wrapVal(this.y + 1, 0, grid.height)],
            [wrapVal(this.x - 1, 0, grid.width), this.y],
        ];

        const queue = [];

        const translocate = (idx, seen = []) => {
            // If we've already seen this cell, we've done a full loop
            if (seen.includes(idx)) return true;

            // Find the cell we want to move
            const initialPos = neighbours[idx];
            const targetCell = grid.cellAt(...initialPos);
            if (!targetCell) return true;

            // If this cell is immovable, abort
            if (targetCell instanceof ImmovableCell) return false;

            // Decide where we want to move it to
            const targetPositionIdx = wrapVal(idx + (this.antiClockwise ? -1 : 1), 0, 4);

            // Check to see if we need to move another cell first
            if (!translocate(targetPositionIdx, seen.concat(idx))) return false;

            // Add the movement to the queue
            queue.push([targetCell, neighbours[targetPositionIdx]]);
            return true;
        };

        // Queue upp the movements
        for (let i = 0; i < neighbours.length; i++) {
            translocate(i);
        }

        // Apply the movements
        for (const item of queue) {
            item[0].x = item[1][0];
            item[0].y = item[1][1];
        }
    }

    // Rotator cells can flip each other
    rotateClockwise() { this.antiClockwise = !this.antiClockwise; return true; }
    rotateAntiClockwise() { this.antiClockwise = !this.antiClockwise; return true; }
}
