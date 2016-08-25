require(['data-layer'], function(dataLayer) {
    var dl = new dataLayer.dl(9, function() {
        showVictory();
    }),
        field = document.querySelector('#field'),
        container = document.createElement('div'),
        cellSize = 40,
        cell;

    container.classList.add('container');

    for(var i = 0; i < dl.size; i++) {
        for(var j = 0; j < dl.size; j++) {
            cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.top = i * cellSize;
            cell.style.left = j * cellSize;
            cell.setAttribute('data-x', i);
            cell.setAttribute('data-y', j);
            container.appendChild(cell);
            dl.setCellNode(i, j, cell);
            cell.addEventListener('click', onCellClick);
            cell.addEventListener('contextmenu', placeFlag);
        }
    }

    field.appendChild(container);

    function onCellClick(e) {
        var element = e.target,
            x = +element.getAttribute('data-x'),
            y = +element.getAttribute('data-y'),
            result = '';

        if(hasClass(element, 'clicked')) {
            return false;
        }

        element.classList.add('clicked');
        result = dl.checkCell(x, y);

        if(typeof result === 'object') {
            if(result.type === 'bombs') {
                showAllBombs(result.array);
            } else {
                showEmpty(result.array);
            }
        } else {
            element.innerHTML = result;
        }
    }

    function placeFlag (e) {
        var element = e.target,
            x = +element.getAttribute('data-x'),
            y = +element.getAttribute('data-y');

        e.preventDefault();

        if(hasClass(element, 'flag')) {
            dl.removeFlag(x, y);
            hideFlag(element);
            return;
        }


        dl.placeFlag(x, y);
        showFlag(element);

    }

    function hasClass(el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }

    function showAllBombs(bombs) {
        for(var i = 0; i < bombs.length; i++) {
            bombs[i].node.classList.add('bomb');
        }

        setTimeout(function() {
            alert('You lose');
        })
    }

    function showEmpty(empty) {
        empty.forEach(function(el) {
            el.node.classList.add('clicked');
        })
    }

    function showFlag(element) {
        element.classList.add('flag');
        element.classList.add('clicked');
    }

    function hideFlag(element) {
        element.classList.remove('flag');
        element.classList.remove('clicked');
    }

    function showVictory() {
        alert('You win!!!');
    }

})