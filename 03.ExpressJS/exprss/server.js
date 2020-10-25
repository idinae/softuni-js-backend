const exprss = require('./exprss');

const app = exprss();

//middleware
function logRequestDate(req, res, next) {
    console.log(Date.now());
    next();
}

app.get('/', logRequestDate, function (req, res) {
    res.end('HELLO FROM EXPRSS');
});

app.listen(3000, function () {
    console.log('EXPRSS is listening on: 3000');
});