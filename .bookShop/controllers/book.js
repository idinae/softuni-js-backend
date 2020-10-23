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
        return cubeModel.findById(id).then(cube => {
            res.render('details', { layout: false, cube });
        }).catch(next);
    },
    getCreateBook(req, res, next) {
        res.render('create', { layout: false });
    },

    // postCreateBook(req, res, next) {
    //     console.log(req.body);
        
    //     const { title, author, isbn } = req.params;
    //     Book.create({ title, author, isbn: +isbn })
    //       .then(() => res.redirect('/'))
    //       .catch(next);
    // }


    // postCreateBook(req, res) {
    //     console.log('Create a book 2nd way');
    //     var newBook = new Book();
      
    //     newBook.title = req.body.title;
    //     newBook.author = req.body.author;
    //     newBook.isbn = Number(req.body.isbn);
     
    //      Book.create({ newBook })
    //       .then(() => {console.log(res); res.redirect('/')});
      
    //   }


    //idakiev
    //   postCreateBook(req, res) {
    //     console.log('Create a book 2nd way');
    //     var newBook = new Book();
    //     console.log(req.body);
    //     const { title, author, isbn } = req.body;
    //     Book.create({ title, author, isbn: +isbn })
    //       .then(() => res.redirect('/'));
    // }



    postCreateBook(req, res) {
        console.log('Create a book 1st way');
        Book.create(
            {
            title: "Test",
            author: "Billy Joe",
            isbn: 77
            },
           //req.body,
            function (err, book) {
                if (err) {
                    res.send('error saving book');
                } else {
                    console.log(book);
                    res.send(book);
                }
    });
    }



    }  
