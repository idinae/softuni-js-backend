const { Router } = require('express');
const { validationResult } = require('express-validator');
const { getUserStatus, checkAuthentication } = require('../controllers/user'); 
const validation = require('../controllers/validation'); 
const Item = require('../models/item');

const router = Router();

router.get('/', getUserStatus, async (req, res) => {  
    res.render('home', { isLoggedIn:  req.isLoggedIn });    
});

router.get('/login', getUserStatus, async (req, res) => { 
    res.render('login', { isLoggedIn:  req.isLoggedIn });    
});

router.get('/register', getUserStatus, async (req, res) => { 
    res.render('register', { isLoggedIn:  req.isLoggedIn });    
});

router.get('/create', getUserStatus, async (req, res) => { 
    res.render('create', { isLoggedIn:  req.isLoggedIn });    
});

router.get('/details/:itemId', getUserStatus, async (req, res) => { 
    res.render('details', { isLoggedIn:  req.isLoggedIn });    
});

router.get('/edit/:itemId', getUserStatus, async (req, res) => { 
    res.render('edit', { isLoggedIn:  req.isLoggedIn });    
});

router.get('/delete/:itemId', getUserStatus, async (req, res) => { 
    res.render('/', { isLoggedIn:  req.isLoggedIn });    
});


router.post('/create', getUserStatus, async (req, res) => { 
    res.render('create', { isLoggedIn:  req.isLoggedIn });    
});

router.post('/edit/:itemId', getUserStatus, async (req, res) => { 
    res.render('edit', { isLoggedIn:  req.isLoggedIn });    
});


module.exports = router;