const Book = require('../models/book');

module.exports = {
    getBooks(req, res) {
        console.log('All books');
        Book.find({})
            .lean()
            .then(books => {
                console.log(books);
                res.render('index', { layout: false, books });
            });
    },
    getBook(req, res, next) {
        const id = req.params.id;
        return Book.findById(id).then(cube => {
            res.render('details', { layout: false, book });
        }).catch(next);
    },
    getCreateBook(req, res, next) {
        res.render('create', { layout: false });
    },

    postCreateBook(req, res, next) { 
        const { title, author, isbn } = req.body;
        Book.create({ title, author, isbn: +isbn })
          .then(() => res.redirect('/'))
          .catch(next);
    }

    // postCreateBook(req, res) {
    //     console.log('Create a book 1st way');
    //     Book.create({
    //             title: "Test",
    //             author: "Billy Joe",
    //             isbn: 77
    //         },
    //         //req.body,
    //         function (err, book) {
    //             if (err) {
    //                 res.send('error saving book');
    //             } else {
    //                 console.log(book);
    //                 res.send(book);
    //             }
    //         });
    // }

/*
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

*/

}