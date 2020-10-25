const bookController = require('../controllers/book');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get('/', bookController.getBooks);
  app.get('/details/:id', bookController.getBook);
  app.get('/create', bookController.getCreateBook);
  app.post('/create', urlencodedParser, bookController.postCreateBook);

  // app.get('*', function(req, res) {
  //   res.render('404');
  // });
};