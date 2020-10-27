const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const userController = require('../controllers/user');

module.exports = (app) => {
  app.get('/', cubeController.getCubes);
  app.get('/login', userController.getLogin);
  app.get('/register', userController.getRegister);

  app.post('/login', userController.postLogin);
  app.post('/register', userController.postRegister);

  app.get('/details/:id', cubeController.getCube);

  app.get('/create/accessory', accessoryController.getCreateAccessory);
  app.post('/create/accessory', accessoryController.postCreateAccessory);

  app.get('/attach/accessory/:id', accessoryController.getAttachAccessory);
  app.post('/attach/accessory/:id', accessoryController.postAttachAccessory);

  app.get('/create', cubeController.getCreateCube);
  app.post('/create', cubeController.postCreateCube);
  
  app.get('/about', function (req, res) {
    res.render('about');
  });

  app.get('*', function (req, res) {
    res.render('404');
  });
};