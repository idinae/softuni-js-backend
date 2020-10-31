const { Router } = require('express');
const { saveUser, verifyUser, checkGestAccess, getUserStatus } = require('../controllers/user'); 
const { validationResult } = require('express-validator');
const validationRegister = require('../controllers/validationRegister');
const validationLogin = require('../controllers/validationLogin');

const router = Router();

//**GET**//

//LOGIN
router.get('/login', checkGestAccess, getUserStatus, (req,res) => {
    res.render('login', { isLoggedIn: req.isLoggedIn })
});

//REGISTER
router.get('/register', checkGestAccess, getUserStatus, (req,res) => {
    res.render('register', { isLoggedIn: req.isLoggedIn })
});

//LOGOUT
router.get('/logout', async (req, res) => { 
    res.clearCookie('aid');
    res.redirect('/');  
});

//**POST**//

//REGISTER
router.post('/register', validationRegister, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', { //return, за да не продължава после надолу
            message: errors.array()[0].msg //така взимаме съобщението от message на грешката
        });
    }
    
    try {
        await saveUser(req, res); //викаме ф-цията с параметрите, които иска
        res.redirect('/'); //ако е успешно, редиректва към home
    } catch(e) {
        console.error(e);
        res.redirect('/register');
    }
});

//LOGIN
router.post('/login', validationLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('login', { //return, за да не продължава после надолу
            message: errors.array()[0].msg //така взимаме съобщението от message на грешката
        });
    }
    
        const status = await verifyUser(req, res);
        if (status) {
            return res.redirect('/');
        }
        res.render('login', { message: 'Wrong username or password!' });
});

module.exports = router;