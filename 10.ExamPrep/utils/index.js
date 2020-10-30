const jwt = require('./jwt');
const auth = require('./auth');
const registerValidator = require('./registerValidator');
const formValidator = require('./formValidator');

module.exports = {
    jwt,
    auth,
    registerValidator,
    formValidator
};