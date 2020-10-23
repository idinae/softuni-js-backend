//build a server
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/book');
var port = 8080;

//locate the db
var db = 'mongodb://localhost:27017/test';

//оpen the local db instance
mongoose.connect(db, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

//define routes
//const routes = require('./config/routes'); //old routes to separate files
//const create = require('./routes/create');
require('./config/routes')(app);

//define view engine
app.engine('.hbs', handlebars({ extname: '.hbs' }));

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

//allows to parse json elements
app.use(bodyParser.json());

//allows to give and receive body element to the url
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true })); //idakiev

//define the path to static files
app.use(express.static(path.join(__dirname, 'static')));

//start the server and test it's working
app.listen(port, function () {
    console.log('App listening on port ' + port); //server is working
});