const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: 'mongodb://localhost:27017/items',
        cookie: 'x-auth-token',
        secret: 'MySecret',
        saltRounds: 10
    }
};

module.exports = config[env];
