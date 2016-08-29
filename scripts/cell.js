define([], function() {
    function Cell(x, y, onHitBomb, onHitEmpty, onPlaceFlag) {
        this.x = x;
        this.y = y;
        this.value = this.EMPTY;
        this.fired = false;
        this.flagged = false;
        this.htmlNode = null;
        this.onHitBomb = onHitBomb;
        this.onHitEmpty = onHitEmpty;
        this.onPlaceFlag = onPlaceFlag;

        this.init();

    }

    Cell.prototype = {
        constructor: Cell,
        BOMB: '*',
        EMPTY: '0',
        init: function() {
            this.addHtmlNode();
            this.attachHandlers();
        },
        addHtmlNode: function() {
            this.htmlNode = document.createElement('div');
            this.htmlNode.classList.add('cell');
        },
        attachHandlers: function() {
            this.htmlNode.addEventListener('click', this.handlers.onClick.bind(this));
            this.htmlNode.addEventListener('contextmenu', this.handlers.onRightClick.bind(this));
        },
        fire: function() {
            this.fired = true;
        },
        showContent: function(isLazy) {
            if(isLazy) {
                showNumber.call(this);
                return;
            }

            switch(this.value) {
                case this.EMPTY: showEmpty.call(this)
                    break;
                case this.BOMB: showBomb.call(this);
                    break;
                default: showNumber.call(this);
            }

            this.fire();

            function showBomb() {
                this.htmlNode.classList.add('bomb');
            };

            function showEmpty() {
                this.htmlNode.classList.add('clicked');
            };

            function showNumber() {
                this.htmlNode.classList.add('clicked');
                this.htmlNode.innerHTML = this.value;
            };
        },
        handlers: {
            onClick: function(e) {
                if(this.fired) {
                    return false;
                }

                switch(this.value) {
                    case this.EMPTY: this.onHitEmpty(this);
                        break;
                    case this.BOMB: this.onHitBomb(this);
                        break;
                    default: this.showContent.call(this, true);

                }
            },
            onRightClick: function(e) {
                e.preventDefault();

                if(this.fired && !this.flagged) {
                    return false;
                }

                if(!this.flagged) {
                    this.flagged = true;
                    this.fired = true;
                    this.htmlNode.classList.add('flag');
                    this.onPlaceFlag(this);
                } else {
                    this.flagged = false;
                    this.fired = false;
                    removeClass.call(this, 'flag');
                }

                function removeClass(className) {
                    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                    this.htmlNode.className = this.htmlNode.className.replace(reg, ' ');
                }
            }
        }
    }

    return {
        cell: Cell
    }
})