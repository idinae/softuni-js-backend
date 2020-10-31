const { Router } = require('express');
const { saveUser, verifyUser, checkGestAccess, getUserStatus } = require('../controllers/user'); 
const { validationResult } = require('express-validator');
const validationRegister = require('../controllers/validationRegister');
const validationLogin = require('../controllers/validationLogin');

const router = Router();

router.get('/login', checkGestAccess, getUserStatus, (req,res) => {
    res.render('login', { isLoggedIn: req.isLoggedIn })
});

router.get('/register', getUserStatus, (req,res) => {
    res.render('register', { isLoggedIn: req.isLoggedIn })
});

router.post('/register', async (req, res) => {
    try {
        await saveUser(req, res); //викаме ф-цията с параметрите, които иска
        res.redirect('/'); //ако е успешно, редиректва към home
    } catch(e) {
        console.error(e);
        res.redirect('/register');
    }
});





router.get('/logout', getUserStatus, async (req, res) => { 
    res.render('home', { isLoggedIn:  req.isLoggedIn });    
});


module.exports = router;