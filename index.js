global.__basedir = __dirname;

const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
const dbConnectionPromise = require('./config/database')(config.dbConnectionString);

//след като се вържем към базата данни, приложението започва да слуша
dbConnectionPromise.then(() => {
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
});