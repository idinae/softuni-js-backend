const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbConnectionString: 'mongodb://localhost:27017/cubes',
        authCookieName: 'auth_cookie',
        authHeaderName: 'auth', //ако имаме мобилно приложение и слагаме кукито в хедъра
        jwtSecret: 'secret',
        saltRounds: 10
    },
    production: {}
};

module.exports = config[env];