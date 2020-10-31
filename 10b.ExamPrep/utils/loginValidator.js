const { body } = require('express-validator');

module.exports = [
    //модулът има достъп до view login и оттам взима имената (name="name")
    body('password', 'Wrong email or password!').isLength({min: 5})
];