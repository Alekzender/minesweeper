define([], function() {
    function Cell(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = this.EMPTY;
        this.fired = false;
    }

    Cell.prototype = {
        constructor: Cell,
        BOMB: '*',
        EMPTY: '0'
    }

    return {
        cell: Cell
    }
})