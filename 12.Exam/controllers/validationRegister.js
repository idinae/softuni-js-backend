const { body } = require('express-validator');
 
module.exports = [
    
    body('username', 'The username should be at least 5 characters long and should contain only english letters and digits')
    .custom((value) => {
        const regex = /[A-Za-z0-9]+/g;
        if( value < 5 || !value.match(regex)) {
        throw new Error (`The username should be at least 5 characters long and should contain only english letters and digits`);
        }
        return true;
    }),
    body('password', 'The password should be at least 5 characters long and should contain only english letters and digits')
    .custom((value) => {
        const regex = /[A-Za-z0-9]+/g;
        if( value < 5 || !value.match(regex)) {
            throw new Error (`The password should be at least 5 characters long and should contain only english letters and digits`);
        }
        return true;
    }),
    body('repeatPassword', 'The repeat password should be equal to the password')
    .custom((value, { req }) => {
        if( value !== req.body.password) {
            throw new Error (`The repeat password should be equal to the password`);
        }
        return true;
    })
];