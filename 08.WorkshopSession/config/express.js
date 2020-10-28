const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    app.set('view engine', '.hbs');

    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(auth);

    const staticFilePath = path.join(global.__basedir, 'static');

    app.use(express.static(staticFilePath));

    //глобален error handler - преместихме го тук
    app.use(function (err, req, res, next) {
        if (err.message === 'BAD_REQUEST!') {
            res.status(400);
            return;
        }
    });
};