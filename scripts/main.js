require(['data-layer'], function(dataLayer) {
    var dl = new dataLayer.dl(9),
        field = document.querySelector('#field'),
        container = document.createElement('div');

    container.classList.add('container');

    for(var i = 0; i < dl.size; i++) {
        for(var j = 0; j < dl.size; j++) {
            container.appendChild(dl.matrix[i][j].htmlNode);
        }
    }

    field.appendChild(container);



})