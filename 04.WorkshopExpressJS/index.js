global.__basedir = __dirname; //създаване на глобална променлива: взима главната директория на проекта и всички пътища са спрямо нея; отпада нуждата от resolve()
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

//глобален error handler
app.use(function (err, req, res, next) {
    //да се обработи грешката
    if (err.message === 'BAD_REQUEST!') {
        res.status(400);
        return;
    }
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));