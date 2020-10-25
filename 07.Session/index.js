const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid'); //генерира случайни id-та
const COOKIE_NAME = 'COOKIE_NAME';

const sessionStore = {};

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
/*
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
*/
//JSON Web Token (JWT) has 3 parts:
//** header - служебна инф-я: кой го е издал, кога изтича
//** payload - данни, които сме сложили; държи се при клиента (при сесията се държи на сървъра)
//** signature - ползва се да се верифицира дали не е променян; вкл. т.нар. secret

const jwt = require('jsonwebtoken');
const _id = '112233';
const username = 'test';

const payload = { _id, username };
const options = { expiresIn: '2d' };
const secret = 'MySecret';
const token = jwt.sign(payload, secret, options);

console.log(token); //$2b$09$qidb1NTXTDlpK5QIL7oEDu2/M6fPxKlK1eEbalO7TRxschO/GfhS2

//decode token
// const token = req.cookies['token'] || sessionStorage.getItem('token'); //depends on where you store it (if in browser, but usualy only in db)
// const decodedToken = jwt.verify(token, sercetKey);
// console.log(decodedToken);

/*

//SESSION based on JWT - not working!!!
var jwt = require('jsonwebtoken');
const TOKEN_KEY = 'TOKEN_KEY';
const secret = 'secret';

function jwtSession(config) {
    return function (req, res, next) {
        let token = req.cookies[TOKEN_KEY] || req.headers[TOKEN_KEY];
        if (!token) {
            req.session = {};
            function setToken(cb) {
                jwt.sign(req.session, secret, config, (err, token) => {
                  if (err) { next(err); return; }
                  res.cookies(TOKEN_KEY, token);
                  res.set(TOKEN_KEY, token); //ако не се поддържат cookies
                  cb();
                });
            }
            const originalSend = res.send;
            res.send = function(...args) {
                setToken(() => {
                    originalSend.apply(res, args);
                });
            };

            // token = jwt.sign(session, secret, config, (err, token) => {
            //     if (err) { next(err); return; }
            //     res.cookies(TOKEN_KEY, token);
            //     res.set(TOKEN_KEY, token); //ако не се поддържат cookies
            //     next();
            // }); //config - тук подаваме опциите, които можем да имаме
            next();
            return;
        }
        jwt.verify(token, secret, function(err, decoded) {
            req.session = decoded;
            next();
        }); //or jwt.decode() - does not verify if it is valid        
    }
}

const app = express();
app.use(cookieParser());
app.use(jwtSession());

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

*/