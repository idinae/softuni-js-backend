const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to Express.js!');
});

app.listen(port, () => console.log(`Express running on port ${port}...`));

//routing syntax
//app.method(path, handler);
//app: instance of express

//get()
// app.get('/', (req, res) => {
//     res.send('GET request to homepage')
// });

//all() - all methods route: обхваща всичките методи, включва и next като аргумент
// app.all('/about', (req, res, next) => {
//     console.log('Middleware execution...');
//     next();
// }, (req, res) => {
//     res.send('Show about page.');
// });

//app.route().get().post().all() - you can create chainable route handlers using app.route()
// app.route('/home')
//     .get((req, res) => {
//         res.send('GET home pate')
//     })
//     .post((req, res) => {
//         res.send('POST home pate')
//     })
//     .all((req, res) => {
//         res.send('Everythind else')
//     })

//ROUTER RESPONSES
//res.download - prompt a file to be downloaded
// app.get('/pdf', (req, res) => {
//     res.download('Full path to PDF')
// })
//res.end - end the response process
//res.json - send a JSON response
//res.redirect('/about/old', (req, res) => {
//     res.redirect('/about')
// })
//res.sendFile() - send a file as an octet stream
// app.get('/file/:fileName', (req, res) => {
//     const fileName = req.params.fileName
//     res.sendFile('PATH TO FILE' + fileName)
// });
//res.render - render a view template

//express.Router - to route handlers
// const express = require('express');
// const router = express.Router();
// router.use(/* add middleware */)
// router.get(/* define route handlers */)
// app.use('/about', router)

//middleware - only for specific path
app.use('/user/:userId', (req, res, next) => {
    const userId = req.params.userId
    //toDo: check if the user exists in db/session
    let userExists = true;
    if (!userExists) {
        res.redirect('/login')
    } else {
        next()
    }
})
app.get('/user/:userId', (req, res) => {
    res.send('User home page!')
})

//статични файлове - файлове, които не съдържат динамична инф/я (напр. идва от DB): index.js, style.css
//слагат се в папка напр. static
//всички файлове от директорията ще са публични
app.use(express.static('public')) //всички статични файлове се взимат от папката public
app.use('./static', express.static('public')) //ако пътят започва със './static' в url, тогава се обработва като статичен

