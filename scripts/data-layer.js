define(['cell'], function(cell) {
    var Cell = cell.cell;



    function DataLayer(size) {
        this.size = size;
        this.minesNum = 10;
        this.matrix = [];
        this.bombs = [];
        this.init();
    }

    DataLayer.prototype = {
        constructor: DataLayer,
        init: function() {
            this.matrix = this.generateMatrix();
            this.placeBombs();
            this.setNumbers();
            this.displayMatrix();
        },
        generateMatrix: function() {
            var matrix = [];
            for(var i = 0; i < 9; i++) {
                matrix[i] = [];
                for(var j = 0; j < 9; j++) {
                    matrix[i][j] = new Cell(i, j);
                }
            }

            return matrix;
        },
        placeBombs: function() {
            var that = this,
                counter;
            for(var i = 0; i < this.minesNum; i++) {
                counter = 0;
                placeBombAtRandomPosition();
            }

            function getRandomNumber() {
                return Math.round(Math.random() * 8);
            }

            function placeBombAtRandomPosition() {
                var x = getRandomNumber(),
                    y = getRandomNumber();

                if(++counter > 10) {
                    return
                }

                if(that.matrix[x][y].value !== Cell.prototype.EMPTY) {
                    placeBombAtRandomPosition();
                } else {
                    that.matrix[x][y].value = Cell.prototype.BOMB;
                    that.bombs.push(that.matrix[x][y]);
                }

                return;
            }
        },
        setNumbers: function() {
            var target = Cell.prototype.BOMB,
                currentCell,
                nearBombs;

            for(var i = 0; i < this.size; i++) {
                for(var j = 0; j < this.size; j++) {
                    currentCell = this.matrix[i][j];

                    if(currentCell.value === target) {
                        continue;
                    }

                    nearBombs = this.countNearElements(i, j, target).number;

                    currentCell.value = nearBombs > 0 ? nearBombs : '';
                }
            }
        },
        countNearElements: function(x, y, target) {
            var counter = 0,
                array = [];

            if(x >= 1) {
                if(this.matrix[x-1][y].value === target) {
                    counter++;
                    array.push(this.matrix[x-1][y]);
                }

                if(y >= 1) {
                    if(this.matrix[x-1][y-1].value === target) {
                        counter++;
                        array.push(this.matrix[x-1][y-1]);
                    }
                }

                if(y < this.size - 2) {
                    if(this.matrix[x-1][y+1].value === target) {
                        array.push((this.matrix[x-1][y+1]))
                    }
                }
            }

            if(x < this.size - 2) {
                if(this.matrix[x+1][y].value === target) {
                    counter++;
                    array.push(this.matrix[x+1][y]);
                }

                if(y >= 1) {
                    if(this.matrix[x+1][y-1].value === target) {
                        counter++;
                        array.push(this.matrix[x+1][y-1]);
                    }
                }

                if(y < this.size - 2) {
                    if(this.matrix[x+1][y+1].value === target) {
                        counter++;
                        array.push(this.matrix[x+1][y+1]);
                    }
                }
            }

            if(y >= 1) {
                if(this.matrix[x][y-1].value === target) {
                    counter++;
                    array.push(this.matrix[x][y-1]);
                }
            }

            if(y < this.size - 2) {
                if(this.matrix[x][y+1].value === target) {
                    counter++;
                    array.push(this.matrix[x][y+1]);
                }
            }

            return {
                number: counter,
                cells: array
            };
        },
        displayMatrix: function() {
            var str = '';
            for(var i = 0; i < this.size; i++) {
                for(var j = 0; j < this.size; j++) {
                    str += this.matrix[i][j].value + ' ';
                }
                str += '\n';
            }

            console.log(str);
        },
        checkCell: function(x, y) {
            var currentCell = this.matrix[x][y];
            if(currentCell.value === Cell.prototype.BOMB) {
                return {
                    type: 'bombs',
                    array: this.bombs
                };

            } else if(currentCell.value === Cell.prototype.EMPTY) {
                return {
                    type: 'empty',
                    array: this.checkEmpty(x, y)
                };
            } else {
                return currentCell.value;
            }
        },
        checkEmpty: function(x, y) {
            var firedEmpty = 0;
            var nearEmpty = [this.matrix[x][y]];



            return nearEmpty
        },
        setCellNode: function(x, y, htmlNode) {
            this.matrix[x][y].node = htmlNode;
        },
        fireCell: function(x, y) {
            this.matrix[x][y].fired = true;
        }

    }

    return {
        dl: DataLayer
    }
})