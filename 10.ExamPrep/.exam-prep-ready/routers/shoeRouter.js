const { shoeController } = require('../controllers');
const { isAuthNeeded } = require('../utils');

module.exports = (router) => {

    router.get('/all', isAuthNeeded(), shoeController.get.all);
    router.get('/create', isAuthNeeded(), shoeController.get.create);
    router.get('/details/:shoeId', isAuthNeeded(), shoeController.get.details);
    router.get('/edit/:shoeId', isAuthNeeded(), shoeController.get.edit);
    router.get('/delete/:shoeId', isAuthNeeded(), shoeController.get.delete);

    router.post('/create', isAuthNeeded(), shoeController.post.create);
    router.post('/edit/:shoeId', isAuthNeeded(), shoeController.post.edit);

    return router;
};