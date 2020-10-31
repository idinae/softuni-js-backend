const { Router } = require('express');
const { validationResult } = require('express-validator');
const { getUserStatus, checkAuthentication } = require('../controllers/user'); //от getUserStatus идва isLoggedIn
const validation = require('../controllers/validation');
const Item = require('../models/item');
const { sortByLikes, sortByDate } = require('../controllers/item');

const router = Router();

//HOME
router.get('/', getUserStatus, async (req, res) => { // async (req, res) - в началото не беше нужно async
    //добавяме 2 вида сортиране за логнат и за гост
    const itemsGuest = await sortByLikes();
    const itemsLogged = await sortByDate();

    res.render('home', { 
        isLoggedIn: req.isLoggedIn,
        itemsGuest, //добавени сортировки
        itemsLogged
    });
});

//CREATE
//GET
router.get('/create', getUserStatus, (req, res) => {
    res.render('create', { isLoggedIn: req.isLoggedIn });
});
//POST
router.post('/create', checkAuthentication, validation, async (req, res) => { // async (req, res) - тук async е нужно!!!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('create', { //return, за да не продължава после надолу
            message: errors.array()[0].msg //така взимаме съобщението от message на грешката
        });
    }
    
    try {
        //взимаме си елементите от формата за create - от req.body
        const { title, description, imageUrl, isPublic } = req.body;
        //взимаме user-а; взимаме го с middleware checkAuthentication (req.user) -> слагаме да се ползва
        const { _id } = req.user;
        //създаваме си дата и я обръщаме на стринг (има и други в-ве дати)
        const createdAt = new Date().toLocaleDateString();
        //тестваме какво има в обекта item
        //console.log(title, description, imageUrl, isPublic === 'on' ? true : false);
        //създаваме си нов обект с всичко това
        const item = new Item({
            title,
            description,
            imageUrl,
            isPublic: isPublic === 'on' ? true : false,
            createdAt,
            creator: _id
        });
        await item.save();
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }

});


// router.get('/details/:itemId', getUserStatus, async (req, res) => { 
//     res.render('details', { isLoggedIn:  req.isLoggedIn });    
// });

// router.get('/edit/:itemId', getUserStatus, async (req, res) => { 
//     res.render('edit', { isLoggedIn:  req.isLoggedIn });    
// });

// router.get('/delete/:itemId', getUserStatus, async (req, res) => { 
//     res.render('/', { isLoggedIn:  req.isLoggedIn });    
// });


// router.post('/create', getUserStatus, async (req, res) => { 
//     res.render('create', { isLoggedIn:  req.isLoggedIn });    
// });

// router.post('/edit/:itemId', getUserStatus, async (req, res) => { 
//     res.render('edit', { isLoggedIn:  req.isLoggedIn });    
// });


module.exports = router;