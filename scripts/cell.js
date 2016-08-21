define([], function() {
    function Cell(x, y) {
        this.x = x;
        this.y = y;

        this.init();
    }

    Cell.prototype = {
        constructor: Cell,
        init: function() {

        }
    }

    return {
        cell: Cell
    }
})