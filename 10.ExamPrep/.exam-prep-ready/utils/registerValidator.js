const { body } = require('express-validator');

module.exports = [
    //модулът има достъп до view register и оттам взима имената (name="name")
    body('email', 'The provided email is not valid!').isEmail(),
    body('fullName', 'Please fill your names!').isAlpha('en-US').isLength({min: 5}),
    body('password', 'The password should be at least 4 characters!').isLength({min: 5}),
    body('repeatPassword').custom(passwordCheck)
];

function passwordCheck(repeatPassword, { req }) { //подава се паролата от полето repeatPassword и се взима рекуеста
    if(repeatPassword !== req.body.password) {
        throw new Error('Repeat password does not match password');
    };
    return true; //ако паролите съвпадат
};