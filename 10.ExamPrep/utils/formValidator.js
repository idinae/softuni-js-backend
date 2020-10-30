const { validationResult } = require('express-validator');

module.exports = (req) => {
    
    //ф-ция на експрес, която чрез request-а приема резултата от валидацията
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
    return {};
    }
};