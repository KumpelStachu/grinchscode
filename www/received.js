$(function() {
    var socket = io();

    var container = document.getElementsByClassName('there-')[0];
    var row = document.getElementsByClassName('that-')[0];

    socket.on('random', function(msg) {
        $('.label-a').first().text(JSON.parse(msg).a);
        $('.label-b').first().text(JSON.parse(msg).b);

        var c = document.createElement('div');
        c.innerHTML = row.innerHTML;
        container.appendChild(c);
    });

    setInterval(() => {
        socket.emit('get random', 0);
    }, 1000);
});