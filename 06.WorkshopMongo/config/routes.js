const cubeController = require('../controllers/cube');

module.exports = (app) => {
  app.get('/', cubeController.getCubes);
  app.get('/details/:id', cubeController.getCube);
  app.get('/create', cubeController.getCreateCube);
  app.post('/create', cubeController.postCreateCube);
  app.get('/about', function(req, res) {
    res.render('about');
  });

  app.get('*', function(req, res) {
    res.render('404');
  });
}; 