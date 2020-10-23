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
//const routes = require('./config/routes');
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

//app.use(express.urlencoded({ extended: true }));

//define the path to static files
app.use(express.static(path.join(__dirname, 'static')));

// app.use('/', routes);
//app.use('/create', create);

//retrieve all the books & 1 book by the express app.get() method
// app.get('/', function (req, res) {
//     res.send('Hi User!'); //express route is working
// });

/*
//GET ALL the books and display them in json format
app.get('/', function (req, res) {
    console.log('Getting all books');
    Book.find({})
        // .exec(function (err, books) {
        //     if (err) {
        //         res.send('error has occured');
        //     } else {
        //         console.log(books);
        //         res.render('index', {layout: false, books });
        //     }
        // });
        //OR
        // .then(books => {
        //     console.log(books);
        //     res.render('index', { layout: false, books });
        // });
});
*/

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
// app.post('/create', function (req, res) {
//     console.log('Create a book 2nd way');
//     var newBook = new Book();

//     newBook.title = req.body.title;
//     newBook.author = req.body.author;
//     newBook.isbn = Number(req.body.isbn);

//     newBook.save(function (err, book) {
//         if (err) {
//             console.log('error sending book');;
//         } else {
//             console.log(book);
//             res.redirect('/');
//         }
//     });
// });

//3rd way to check out from Idakiev
// app.post('/create', function (req, res, next) {
//     const {
//         title,
//         author,
//         isbn
//     } = req.body;
//     Book.create({
//             title,
//             author,
//             isbn: +isbn
//         })
//         .then(() => res.redirect('/'))
//         .catch(next);
// });

//UPDATE a book
app.put('/update/:id', function (req, res) {
    Book.findOneAndUpdate({
            _id: req.params.id
        }, //query (what to update)
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                category: req.body.category
            }
        }, {
            upsert: true
        }, //3rd parameter (optional) - if the title does not exist, insert it
        function (err, newBook) {
            if (err) {
                console.log('error occured when updating');
            } else {
                console.log(newBook);
                res.send(newBook); //indicates that the book was updated correctly
            }
        });
});

//DELETE a book
app.delete('/delete/:id', function (req, res) {
    Book.findOneAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) {
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