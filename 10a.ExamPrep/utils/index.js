const jwt = require('./jwt');
const auth = require('./auth');
const registerValidator = require('./registerValidator');
const loginValidator = require('./loginValidator');
const formValidator = require('./formValidator');
const isAuthNeeded = require('./isAuthNeeded');

module.exports = {
    jwt,
    auth,
    registerValidator,
    loginValidator,
    formValidator,
    isAuthNeeded
};