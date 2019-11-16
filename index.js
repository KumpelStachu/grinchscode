$(function() {
    var socket = io();
    $('form').submit(function(e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('init messages', function(messages) {
        var msgs = JSON.parse(messages)
        $.each(msgs, function(i) {
            $('#messages').append($('<li>').text(msgs[i]));
        })
    });
});