const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

/*
function logRequestDate(req, res, next) {
    console.log(new Date());
    setTimeout(function () {
        next();
    }, 3000)
}
*/

const jsonBodyParser = express.json();
const urlEncodedBodyParser = express.urlencoded({
    extended: true
});

const users = [{
        name: 'Ivan',
        age: 20
    },
    {
        name: 'Pepi',
        age: 30
    }
];

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('views', './web/03.ExpressJS/express/views'); //аз си го добавих! 
app.set('view engine', '.hbs');

app.use('/static', express.static('./web/03.ExpressJS/express/static'));

app.use(jsonBodyParser);
app.use(urlEncodedBodyParser);

//app.use(logRequestDate) - вместо app.get('/', logRequestDate, function (req, res) {}

app.get('/', /*logRequestDate,*/ function (req, res) {
    //res.send('HELLO FROM EXRPESS!');
    //res.sendFile(path.resolve('./web/03.ExpressJS/express/index.html')); //sendFile иска пълен path, не релативен, затова добавяме path.resolve - но при мен за момента не работи с релативен path!!!
    res.render('home', { users });
});

app.get('/user/:idx', function(req, res) {
    const selectedUser = users[req.params.idx];
    res.render('home', { users, selectedUser, selectedUserIndex: req.params.idx });
});

app.post('/user/:idx', function(req, res) {
    const { name, age } = req.body;
    users[req.params.idx] = { name, age: +age };
    res.redirect('/');
});

app.post('/user', function (req, res) {
    const { name, age } = req.body;
    users.push({ name, age: +age });
    res.redirect('/');
});

app.get('/about', /*logRequestDate,*/ function (req, res) {
    //res.send('HELLO FROM EXRPESS!');
    //res.sendFile(path.resolve('./web/03.ExpressJS/express/index.html')); //sendFile иска пълен path, не релативен, затова добавяме path.resolve - но при мен за момента не работи с релативен path!!!
    res.render('about', { about: 'About Me' });
});

app.post('/', /*logRequestDate,*/ function (req, res) {
    console.log(req.body);
    res.send(req.body); //в express е по-добре да се ползва send, а не end
});

app.listen(3000, function () {
    console.log('App is listening on: 3000');
});