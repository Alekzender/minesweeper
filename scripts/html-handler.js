define(['data-layer', 'field', 'cell'], function(dataLayer, field, cell) {
    var DataLayer = dataLayer.dataLayer;
    var Cell = cell.cell;
    var Field = field.field;
    function HtmlHandler(htmlNode) {
        this.cells = [];
        this.init(htmlNode);
        this.fieldSize = 9; //TODO move to config
    }

    HtmlHandler.prototype = {
        constructor: HtmlHandler,
        init: function(fieldNode) {
            this.dl = new DataLayer();
            var row = [];
            this.field = new Field(fieldNode);
            for(var i = 0; i < this.fieldSize; i++) {
                for(var j = 0; j < this.fieldSize; j++) {
                    row.push(new Cell(j, i));
                }
            }
        }
    }

    return {
        handler: HtmlHandler
    };
});
