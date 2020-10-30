const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { auth } = require('../utils');

module.exports = (express, app) => {
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(auth); //ф-цията е важно да е тук!!! между cookieParser и app.engine

    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: 'base-layout.hbs',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));
    app.set('viewengine', 'hbs');
};
