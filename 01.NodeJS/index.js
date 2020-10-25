//create Node server

/*
//1st - easier way, arrow function
const http = require('http');

http.createServer((req, res) => {
    res.write('Hi!');
    res.end();
}).listen(1337);
*/
/*
//2nd - function (т.к. не е нужно да се ползва arrow и да се пази контекстът); четем от файл конфигурацията
const config = require('./config.json');
const http = require('http');

http.createServer(function(req, res) {
    res.write('Hello World!');
    res.end();
}).listen(config.port);
*/
//3rd - async reading from file
const config = require('./config.json');
const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('./web/01.NodeJS/text.txt', {
        encoding: 'utf-8'
    }, function (err, content) {
        res.end(content.toUpperCase());
    });

}).listen(config.port);


//URL Module
//parse()
// const url = require('url');
// let urlObj = url.parse("www.abv.bg");
// console.log(urlObj.pathname); //urlObj.url, host, pathname, query, search, hostname

// const queryStr = require('querystring');
// const qs = queryStr.parse('year=2020&month=february');
// const year = qs.year;
// const month = qs.month;
// console.log(year, month); //2020 february


// const _ = require('lodash');
// const res = _.chunk(['a', 'b', 'c', 'd'], 2);
// console.log(res);

//common module
// const fs = require('fs'); //file system
// const content = fs.readFileSync('./web/node/config.json'); //full path?! чете от файл
// console.log(content.toString()); //whrite the file content in debug console

//my module
// const utils = require('./utils.js');
// console.log(utils.sum(1, 2));