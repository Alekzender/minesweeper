define([], function() {
    function Field(htmlNode) {
        this.container = htmlNode;

        this.init();
    }

    Field.prototype = {
        constructor: Field,
        init: function() {

        }
    }

    return {
        field: Field
    }
})