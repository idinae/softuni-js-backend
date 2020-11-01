const { Router } = require('express');
const { validationResult } = require('express-validator');
const { getUserStatus, checkAuthentication } = require('../controllers/user'); //от getUserStatus идва isLoggedIn; от checkAuthentication идва юзъра
const validation = require('../controllers/validation');
const Item = require('../models/item');
const { sortByLikes, sortByDate, getItem } = require('../controllers/item');

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

//DETAILS
router.get('/details/:id', checkAuthentication, getUserStatus, async (req, res) => {
    const id = req.params.id;
    try {
    const item = await getItem(id);
    const isCreator = item.creator.toString() === req.user._id.toString();
    const isLiked = item.usersLiked.filter(x => x.toString() === req.user._id.toString());
    res.render('details', { 
        isLoggedIn: req.isLoggedIn,
        isLiked,
        isCreator,
        ...item
     });
    } catch(e) {
        console.error(e);
        res.redirect('/');
    }
});

//LIKES
router.get('/like/:id', checkAuthentication, async (req, res) => {
    const itemId = req.params.id;
    const { _id } = req.user; //user идва от checkAuthentication
    
    try {
    await Item.findByIdAndUpdate(itemId , {
        $addToSet: {    //adds a value to an array unless the value is already present
            usersLiked: [_id]
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
    const id = req.params.id;
    try {
    const item = await getItem(id);
    console.log(item);
    
    res.render('edit', { 
        isLoggedIn:  req.isLoggedIn,
        ...item
    });
    } catch(e) {
        console.error(e);
        res.redirect(`/edit/${id}`);
    }
});

//POST
// router.post('/edit/:itemId', getUserStatus, async (req, res) => { 
//     res.render('edit', { isLoggedIn:  req.isLoggedIn });    
// });


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