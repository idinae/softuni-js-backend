const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid'); //генерира случайни id-та
const COOKIE_NAME = 'COOKIE_NAME';

const sessionStore = {

};

function session(req, res, next) {
        if(!req.cookies[COOKIE_NAME]) {
        const id = uuid.v1();
        sessionStore[id] = {};  //session
        res.cookie(COOKIE_NAME, id);
        req.session = sessionStore[id];
    } else {
        const id = req.cookies[COOKIE_NAME];
        req.session = sessionStore[id];
    }
    next();
}

const app = express();
app.use(cookieParser());
app.use(session);

app.get('/', function (req, res) {
    req.session.value = 123;
    res.send('HOME!');
});

app.get('/about', function (req, res) {
    console.log(req.session);
    res.send('ABOUT!');
});

app.listen(3000, function() {
    console.log('Server is running on 3000');
});