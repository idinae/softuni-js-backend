const { validationResult } = require('express-validator');

module.exports = (req) => {
    
    //ф-ция на експрес, която чрез request-а приема резултата от валидацията
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return {
            contextOptions: {
                oldInput: {
                    ...req.body
                },
                message: `${errors.array()[0].msg}` //взима message на 1-вата гръмнала валидация
            },
            isOk: false //сигнализира, че има гръмнала валидация
        };
    }
    return { isOk: true };
};