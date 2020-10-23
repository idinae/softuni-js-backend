const bookController = require('../controllers/book');

module.exports = (app) => {
  app.get('/', bookController.getBooks);
  app.get('/details/:id', bookController.getBook);
  app.get('/create', bookController.getCreateBook);
  app.post('/create', bookController.postCreateBook);

  // app.get('*', function(req, res) {
  //   res.render('404', { layout: false });
  // });
};