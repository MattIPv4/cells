import { PusherCell } from './PusherCell';

export class MoverCell extends PusherCell {
    constructor(x = 0, y = 0, dir = 0) {
        super(x, y, dir);
        this.color = 'rgb(20, 150, 250)';
    }

    // The mover cell moves itself and other cells
    update(grid) {
        super.update(grid);

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
