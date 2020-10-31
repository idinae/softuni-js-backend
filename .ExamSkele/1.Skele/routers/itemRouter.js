const { itemController: itemController } = require('../controllers');
const { isAuthNeeded } = require('../utils');

module.exports = (router) => {

    router.get('/all', isAuthNeeded(), itemController.get.all);
    router.get('/create', isAuthNeeded(), itemController.get.create);
    router.get('/details/:itemId', isAuthNeeded(), itemController.get.details);
    router.get('/edit/:itemId', isAuthNeeded(), itemController.get.edit);
    router.get('/delete/:itemId', isAuthNeeded(), itemController.get.delete);

    router.post('/create', isAuthNeeded(), itemController.post.create);
    router.post('/edit/:itemId', isAuthNeeded(), itemController.post.edit);

    return router;
};