define(['cell'], function(cell) {
    var Cell = cell.cell;

    function DataLayer(size, onVictory, onFail) {
        this.size = size;
        this.bombsNum = 10;
        this.matrix = [];
        this.bombs = [];
        this.flags = [];
        this.firedNum = 0;
        this.total = this.size * this.size;
        this.onVictory = onVictory;
        this.onFail = onFail;
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
                    matrix[i][j] = addCell.call(this, i, j);

                }
            }

            function addCell(i, j) {
                var cell = new Cell(i, j, this.onHitBomb.bind(this), this.onHitEmpty.bind(this), this.onPlaceFlag.bind(this));

                return cell;
            }

            return matrix;
        },
        onHitBomb: function() {
            this.bombs.forEach(function(cell) {
                cell.showContent();
            });

            this.onFail();

        },
        onHitEmpty: function(hittedCell) {
            var empty = this.checkEmpty(hittedCell.x, hittedCell.y),
                notEmpty = [];

            empty.forEach(function(cell) {
                cell.showContent();
                var x = this.getNearNotFired(cell.x, cell.y);

                notEmpty = notEmpty.concat(x);
            }.bind(this));
            notEmpty.forEach(function(cell) {
                cell.showContent();
            })
        },
        onPlaceFlag: function(cell) {
            this.checkWin();
        },
        placeBombs: function() {
            var that = this,
                counter;
            for(var i = 0; i < this.bombsNum; i++) {
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

                    currentCell.value = nearBombs > 0 ? nearBombs : Cell.prototype.EMPTY;
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

                if(y < this.size - 1) {
                    if(this.matrix[x-1][y+1].value === target) {
                        counter++;
                        array.push((this.matrix[x-1][y+1]))
                    }
                }
            }

            if(x < this.size - 1) {
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

                if(y < this.size - 1) {
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

            if(y < this.size - 1) {
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
        getNearNotFired: function(x, y) {
                array = [];

            if(x >= 1) {
                if(!this.matrix[x-1][y].fired) {
                    array.push(this.matrix[x-1][y]);
                }

                if(y >= 1) {
                    if(!this.matrix[x-1][y-1].fired) {
                        array.push(this.matrix[x-1][y-1]);
                    }
                }

                if(y < this.size - 1) {
                    if(!this.matrix[x-1][y+1].fired) {
                        array.push((this.matrix[x-1][y+1]))
                    }
                }
            }

            if(x < this.size - 1) {
                if(!this.matrix[x+1][y].fired) {
                    array.push(this.matrix[x+1][y]);
                }

                if(y >= 1) {
                    if(!this.matrix[x+1][y-1].fired) {
                        array.push(this.matrix[x+1][y-1]);
                    }
                }

                if(y < this.size - 1) {
                    if(!this.matrix[x+1][y+1].fired) {
                        array.push(this.matrix[x+1][y+1]);
                    }
                }
            }

            if(y >= 1) {
                if(!this.matrix[x][y-1].fired) {
                    array.push(this.matrix[x][y-1]);
                }
            }

            if(y < this.size - 1) {
                if(!this.matrix[x][y+1].fired) {
                    array.push(this.matrix[x][y+1]);
                }
            }

            return array;
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
        checkEmpty: function(x, y, arr) {
            var newArr = this.countNearElements(x, y, Cell.prototype.EMPTY).cells;
            arr = arr || [this.matrix[x][y]];

            for(var i = 0; i < newArr.length; i++) {
                if(!newArr[i].fired) {
                    this.fireCell(newArr[i].x, newArr[i].y);
                    this.checkEmpty(newArr[i].x, newArr[i].y, arr);
                    arr.push(newArr[i]);
                }
            }

            return arr;
        },
        fireCell: function(x, y) {
            this.matrix[x][y].fire();
            this.firedNum++;
        },
        checkWin: function() {
            var flaggedBombsNum = 0;

            for(var i = 0; i < this.bombs.length; i++) {
                if(this.bombs[i].flagged) {
                    flaggedBombsNum++;
                }
            }


            if(flaggedBombsNum === this.bombsNum) {
                this.onVictory()
            }
        }


    }

    return {
        dl: DataLayer
    }
})