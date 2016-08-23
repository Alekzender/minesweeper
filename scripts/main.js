require(['data-layer'], function(dataLayer) {
    var dl = new dataLayer.dl(9),
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
            cell.addEventListener('click', onCellClick)
        }
    }

    field.appendChild(container);

    function onCellClick(e) {
        var element = e.target,
            x = element.getAttribute('data-x'),
            y = element.getAttribute('data-y'),
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

    function hasClass(el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }

    function showAllBombs(bombs) {
        bombs.forEach(function(el) {
            dl.fireCell(el.x, el.y);
            el.node.classList.add('bomb');
        })
    }

    function showEmpty(empty) {
        empty.forEach(function(el) {
            el.node.classList.add('clicked');
        })
    }


})