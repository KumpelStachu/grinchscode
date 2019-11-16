function register(l, p) {
    var socket = io();
    socket.emit('register', JSON.stringify({
        uuid: getCookie('uuid'),
        login: l,
        password: p
    }));
    return true;
}

function loguj(l, p) {
    var socket = io();
    socket.emit('login', JSON.stringify({
        uuid: getCookie('uuid'),
        login: l,
        password: p
    }));
    return true;
}

function send(name) {
    var socket = io();
    socket.emit('send', JSON.stringify({
        uuid: getCookie('uuid'),
        name: name
    }));
    return true;
}


function getCookie(name) {
    return Cookies.get(name) || 'abc'
}