const userModel = require('../models/user');

module.exports = {
    getRegister(req, res) {
        if (req.user) {
            res.redirect('/');
            return;
        }
        res.render('register') //{ isLoged: false } - не е нужно, тъй като по дефолт ще си е false
    },
    postRegister(req, res, next) {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            res.render('register', { errorMessage: 'Password don\'t match!' });
            return;
        }

        userModel.create({ username, password })
            .then(() => { res.redirect('./login'); })
            .catch(next);
    },
    getLogin(req, res) {
        if (req.user) {
            res.redirect('/');
            return;
        }
        res.render('login')
    },
    postLogin(req, res, next) {
        const { username, password } = req.body;
        userModel.findOne({ username })
            .then(user => user ? user.comparePasswords(password) : false)
            .then(match => {
                if (!match) {
                    res.render('login', { errorMessage: 'Wrong username or password' });
                    return;
                }
                //create jwt and set cookie
            }).catch(next);
    }
};