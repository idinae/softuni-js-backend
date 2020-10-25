//build a simple server and test it's running; locate the db
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
var port = 8080;
var db = 'mongodb://localhost/books';

//оpen the local db instance
mongoose.connect(db);

app.use(bodyParser.json()); //allows us to parse json elements
app.use(bodyParser.urlencoded({ //allows us to give and receive body element to the url - using Postman in this case
    extended: true
}));

//retrieve all the books & 1 book by the express app.get() method
app.get('/', function (req, res) {
    res.send('Hi User!'); //express route is working
});

//GET ALL the books and display them in json format
app.get('/books', function (req, res) {
    console.log('Getting all books');
    Book.find({})
        .exec(function (err, books) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(books);
                res.json(books);
            }
        });
});

//GET a particular book - using the body-parser and mongoose method findOne()
app.get('/books/:id', function (req, res) {
    console.log('Getting one book');
    Book.findOne({
            _id: req.params.id //the req.params.id is the ":id" in the address above
        })
        .exec(function (err, book) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(book);
                res.json(book);
            }
        });
});

//CREATE a book - 1st way: using Book.create({}, function() {})
/*
app.post('/create', function (req, res) {
    console.log('Create a book 1st way');
    Book.create(
        //{
        // title: "Test",
        // author: "Billy Joe",
        // category: "Horror"
        //}
        req.body,
        function (err, book) {
            if (err) {
                res.send('error saving book');
            } else {
                console.log(book);
                res.send(book);
            }
        });
});
*/

//CREATE a book - 2nd way: var newBook = new Book() - mostly used!
app.post('/create', function (req, res) {
    console.log('Create a book 2nd way');
    var newBook = new Book();

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function (err, book) {
        if (err) {
            res.send('error sending book');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});

//UPDATE a book
app.put('/update/:id', function (req, res) {
    Book.findOneAndUpdate(
        { _id: req.params.id }, //query (what to update)
        { $set: { title: req.body.title, author: req.body.author, category: req.body.category } }, 
        { upsert: true }, //3rd parameter (optional) - if the title does not exist, insert it
        function(err, newBook) {
            if(err) {
                console.log('error occured when updating');
            } else {
                console.log(newBook);
                res.send(newBook); //indicates that the book was updated correctly
            }
        });
});

//DELETE a book
app.delete('/delete/:id', function(req, res) {
    Book.findOneAndRemove({
        _id: req.params.id 
    }, function(err, book) {
        if(err) {
            console.log('error occured when deleting');
            res.send('error deleting');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});


//start the server and test it's working
app.listen(port, function () {
    console.log('App listening on port ' + port); //server is working
});