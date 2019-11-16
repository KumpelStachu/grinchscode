$(function() {
    var socket = io();

    var container = document.getElementsByClassName('there-')[0];
    var row = document.getElementsByClassName('that-')[0];

    socket.emit('get sent', 0);

    socket.on('sent', function(msg) {
        var arr = JSON.parse(msg);
        arr = arr.map(str => JSON.parse(str)).filter(Boolean)
        arr.forEach(function(value) {

            $('.label-a').first().text(value.name);

            var c = document.createElement('div');
            c.innerHTML = row.innerHTML;
            container.appendChild(c);

        });

    });
});