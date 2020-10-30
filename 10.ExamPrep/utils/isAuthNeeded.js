module.exports = (isAuthNeeded = false) => {
    return (req, res, next) => {
        //няма аутентификация, а се опитва да достъпи нещо
        const isNotAuthWhenNeeded = !req.user && isAuthNeeded; 
        //има аутентификация, а може и без нея
        const isAuthWhenNotNeeded = req.user && !isAuthNeeded;

        if(isNotAuthWhenNeeded || isAuthWhenNotNeeded) {
            const redirectPage = isNotAuthWhenNeeded ? '/user/login' : '/shoes/all';
            res.redirect(redirectPage);
            return;
        }
        next();
    };
};