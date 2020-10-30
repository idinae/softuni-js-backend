const { homeController } = require('../controllers');
const { isAuthNeeded } = require('../utils');

module.exports = (router) => {
    router.get('/', isAuthNeeded(false), homeController.get.home);
    
    return router;
};
