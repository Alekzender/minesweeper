define([], function() {
    function Cell(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = this.EMPTY;
        this.init();
        this.fired = false;
    }

    Cell.prototype = {
        constructor: Cell,
        init: function() {

        },
        getHtml: function() {

        },
        BOMB: '*',
        EMPTY: ''
    }

    return {
        cell: Cell
    }
})