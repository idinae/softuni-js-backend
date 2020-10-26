module.exports = {
    getRegister(req, res) {
        if (req.user) {
            res.redirect('/');
            return;
        }
        res.render('register') //{ isLoged: false } - не е нужно, тъй като по дефолт ще си е false
    },
    getLogin(req, res) {
        if (req.user) {
            res.redirect('/');
            return;
        }
        res.render('login')
    },
}