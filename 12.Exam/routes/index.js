const { Router } = require('express');
const { validationResult } = require('express-validator');
const { getUserStatus, checkAuthentication } = require('../controllers/user'); //от getUserStatus идва isLoggedIn; от checkAuthentication идва юзъра
const validation = require('../controllers/validation');
const Item = require('../models/item');
const { sortByEnrolled, sortByDate, getItem } = require('../controllers/item');

const router = Router();

//HOME
router.get('/', getUserStatus, /*checkAuthentication, */async (req, res) => {
   // const { username } = req.user;
        const itemsGuest = await sortByEnrolled();
        const itemsLogged = await sortByDate();
    //console.log(req.body.user);

    res.render('home', { 
        isLoggedIn: req.isLoggedIn,
        //username,
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
router.post('/create', checkAuthentication, validation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('create', { 
            message: errors.array()[0].msg 
        });
    }
    
    try {
        const { title, description, imageUrl, duration } = req.body;
        const { _id } = req.user;
        const createdAt = new Date().toLocaleDateString();
        const item = new Item({
            title,
            description,
            imageUrl,
            duration,
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

//DETAILS
router.get('/details/:id', checkAuthentication, getUserStatus, async (req, res) => {
    const id = req.params.id;
    
    try {
    const item = await getItem(id);
    const isCreator = item.creator.toString() === req.user._id.toString();
    const isEnrolled = item.enrolled.filter(x => x.toString() === req.user._id.toString());
    res.render('details', { 
        isLoggedIn: req.isLoggedIn,
        isEnrolled,
        isCreator,
        ...item
     });
    } catch(e) {
        console.error(e);
        res.redirect('/');
    }
});

//ENROLL
router.get('/enroll/:id', checkAuthentication, async (req, res) => {
    const itemId = req.params.id;
    const { _id } = req.user; //user идва от checkAuthentication
    
    try {
    await Item.findByIdAndUpdate(itemId , {
        $addToSet: {    //adds a value to an array unless the value is already present
            enrolled: [_id]
        }
    });
    res.redirect(`/details/${itemId}`);

    } catch(e) {
        console.error(e);
        res.redirect('/');
    }
});

//UPDATE

//GET
router.get('/edit/:id', getUserStatus, async (req, res) => {
    const itemId = req.params.id;
    try {
    const item = await getItem(itemId);
    res.render('edit', { 
        isLoggedIn:  req.isLoggedIn,
        ...item
    });
    } catch(e) {
        console.error(e);
        res.redirect(`/edit/${itemId}`);
    }
});

//POST
router.post('/edit/:id', checkAuthentication, getUserStatus, validation, async (req, res) => { 
    const itemId = req.params.id;
    const item = await getItem(itemId);
    //валидация
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('edit', { //return, за да не продължава после надолу
            isLoggedIn:  req.isLoggedIn,
            ...item,
            message: errors.array()[0].msg //така взимаме съобщението от message на грешката
        });
    }
    //запис в базата
    try {
        const { title, description, imageUrl, duration } = req.body;
        const { _id } = req.user;
        const createdAt = new Date().toLocaleDateString();
        const item = {
            title,
            description,
            imageUrl,
            duration,
            createdAt,
            creator: _id
        };
        
        await Item.findByIdAndUpdate( 
            itemId,
            { ...item }
        );
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }

});


//DELETE
router.get('/delete/:id', getUserStatus, async (req, res) => {
    const itemId = req.params.id;
    try {
    await Item.deleteOne({ _id: itemId } );
    res.redirect('/');
    } catch(e) {
        console.error(e);
        res.redirect(`/details/${itemId}`);
    }
});

module.exports = router;