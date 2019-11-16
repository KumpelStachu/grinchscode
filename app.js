var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Url = require('url-parse');
var uuid = require('uuid/v4');
var cookie = require('cookie');
var HashMap = require('hashmap');
var nickname = require('nicknames');


app.post('/*', function(req, res) {
    res.redirect('home.html');
});

app.get('/', function(req, res) {
    res.redirect('home.html');
});

app.get('/*', function(req, res) {
    var url = new Url(req.url);
    if (url.pathname.includes('.html')) {
        var cookies = cookie.parse(req.headers.cookie || '');
        var id = cookies.id || uuid();
        res.cookie('uuid', id, {
            maxAge: 8640000,
            httpOnly: true
        });
    }
    res.sendFile(__dirname + '/www/' + url.pathname, );
});

var users = new HashMap();
var uuids = new HashMap();
var gifts = new HashMap();

for (var i = 0; i > 50; i++) {
    users.set('user' + i, 1);
    console.log('user' + i, 1)
}

io.on('connection', function(socket) {
    socket.on('login', function(msg) {
        var user = JSON.parse(msg);
        if (users.get(user.login) == user.password)
            uuids.set(user.login, msg.uuid);
    });

    socket.on('register', function(msg) {
        var user = JSON.parse(msg);
        if (!users.has(user.login)) {
            users.set(user.login, user.password);
            uuids.set(user.login, msg.uuid);
        }
    });

    socket.on('send', function(name) {
        if (!gifts.has(name.uuid))
            gifts.set(name.uuid, [name]);
        else {
            var temp = gifts.get(name.uuid)
            temp.push(name)
            gifts.set(name.uuid, temp)
        }
        console.log(gifts.get(gifts.keys[0]))
    });

    socket.on('get random', function(msg) {
        socket.emit('random', JSON.stringify({
            a: nickname.allRandom(),
            b: randomGift()
        }));
    });

    socket.on('get sent', function(msg) {
        socket.emit('sent', JSON.stringify(gifts.get(gifts.keys[0])));
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

function randomGift() {
    var liczba = gifty.length;
    var los = Math.floor(Math.random() * liczba);
    return gifty[los];
}

const gifty = [
    'Nerka',
    'Statek',
    'Kajak',
    'Motor',
    'Jacht',
    'Tratwa',
    'Dratwa',
    'Szpula',
    'Nitka',
    'Niteczka',
    'Chusteczka',
    'Chustka',
    'Beton',
    'Woda',
    'Sklepik',
    'Pilot',
    'Karuzela',
    'Moneta',
    'Motyl',
    'Komar',
    'Pasikonik',
    'Mucha',
    'Jedwabnik',
    'Jaszczurka',
    'Smok',
    'Smoczek',
    'Wierzba',
    'Skarpeta',
    'Skarpetka',
    'Klon',
    'Klawisz',
    'Syntezator',
    'Perkusja',
    'Kubek',
    'Portfel',
    'Skrzynka',
    'Skrzynia',
    'Papier',
    'Wapno',
    'Cement',
    'Kreda',
    'Ceramika',
    'Pustak',
    'Regips',
    'Szpachla',
    'Lakier',
    'Torebka',
    'Torba',
    'Fotel',
    'Klucze',
    'Terakota',
    'Rolety',
    'Antena',
    'Smycz',
    'Szklanka',
    'Talerz',
    'Waza',
    'Miska',
    'Wanna',
    'Umywalka',
    'Prysznic',
    'Natrysk',
    'Komoda',
    'Stolnica',
    'Limonka',
    'Limetka',
    'Saszetka',
    'Wata',
    'Plaster',
    'Flamaster',
    'Kredki',
    'Piasek',
    'Kruszywo',
    'Ciasto',
    'Ciasteczka',
    'Makaron',
    'Tablet',
    'Smartfon',
    'Proszek',
    'Stoper',
    'Kolumny',
    'Poduszka',
    'Materac',
    'Fotelik',
    'Klapki',
    'Lampa',
    'Wycinanki',
    'Karton',
    'Folia',
    'Podstawka',
    'Konewka',
    'Marker',
    'Ploter',
    'Niszczarka',
    'Soda',
    'Panierka',
    'Kaseton',
    'Latarka',
    'Lejek',
    'Lustro',
    'Laminat',
    'Lekarstwa',
    'Lubczyk',
    'Listwa',
    'Lornetka',
    'Tarka',
    'Tusz',
    'Barwnik',
    'Teleskop',
    'Tapczan',
    'Tasak',
    'Futro',
    'Kredens',
    'Koperta',
    'Obrus',
    'Piec',
    'Rower',
    'Skuter',
    'Wiadro',
    'Wieszak',
    'Beret',
]