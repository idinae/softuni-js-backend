const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid'); //генерира случайни id-та
const COOKIE_NAME = 'COOKIE_NAME';

const sessionStore = {

};

function session(config) {
    return function (req, res, next) {
        if (!req.cookies[COOKIE_NAME]) {
            const id = uuid.v1();
            sessionStore[id] = {}; //session
            res.cookie(COOKIE_NAME, id, { httpOnly: config ? !!config.httpOnly : false }); //чрез !! превръщаме стойността в boolean
            req.session = sessionStore[id];
        } else {
            const id = req.cookies[COOKIE_NAME];
            req.session = sessionStore[id];
        }
        next();
    }
}

const app = express();
app.use(cookieParser());
 app.use(session({ httpOnly: true })); //по този начин cookie-то не може да се достъпва през js; при false - може чрез document.cookie

app.get('/', function (req, res) {
    req.session.value = 123;
    res.send('HOME!');
});

app.get('/about', function (req, res) {
    console.log(req.session);
    res.send('ABOUT!');
});

app.listen(3000, function () {
    console.log('Server is running on 3000');
});

//Bcrypt is a password hashing funcion - recommended way is Async
const bcrypt = require('bcrypt');
const saltRounds = 9; //"ниво" на криптиране
const myPlainTextPass = "123";

//generate hash
bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(myPlainTextPass, salt, (err, hash) => {
        console.log(hash); //криптираната парола трябва да се свърже с потребителя обаче!
    });
});

//check password
const hash = '$2b$09$OC/btVn27LTUCdbJICRwy.onmh.bU4hXa4GzOyh5mz8fM8sB//5Ga'; //пази се в базата данни

bcrypt.compare(myPlainTextPass, hash, (err, res) => {
    console.log(res); //true
});