import { Cell } from './Cell';

export class PusherCell extends Cell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(20, 100, 200)';
    }

    update(grid) {
        switch (this.dir) {
            case 0:
                this.decrementY(grid, this);
                break;
            case 1:
                this.incrementX(grid, this);
                break;
            case 2:
                this.incrementY(grid, this);
                break;
            case 3:
                this.decrementX(grid, this);
                break;
        }
    }
}
