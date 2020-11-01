const { body } = require('express-validator');
 
module.exports = [
    body('title', 'The title should be at least 4 characters')
    .isLength({
        min: 4
    }),
    body('description', 'The description should be at least 20 characters long')
    .isLength({
        min: 20
    }),
    body('imageUrl', 'The imageUrl start with http or https')
     .custom((value) => {
        const regex = /^(http|https)/g;
        if(!value.match(regex)) {
        throw new Error (`The imageUrl should starts with http or https`);
        }
        return true;
    }),
    body('duration', 'The duration should not be empty')
    .isLength({
        min: 1
    })
];