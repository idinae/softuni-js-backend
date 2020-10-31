module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: 'MySecretKey',
        databaseUrl: 'mongodb://localhost:27017/items'
    },
    production: {}
};

//Mongo Cloud
//`mongodb+srv://user:softuni-password@softuni-5daup.mongodb.net/exam?retryWrites=true&w=majority`