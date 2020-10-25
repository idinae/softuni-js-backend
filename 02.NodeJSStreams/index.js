//READABLE AND WRITABLE STREAMS

const stream = require('stream');

function createReadableStream(data) {
    let counter = 0;
    const rs = stream.Readable({
        read(size) {
            const item = data[counter++] || null; //когато пушнем null в стрийма - връзката се затваря
            this.push(item ? Buffer.from(item.toString()) : null); //създаваме си буфер
        }
    });
    return rs;
}

function createWritableStream() {
    let data;

    const ws = stream.Writable({
        write(chunk, enc, next) {
            //data = data.concat(chunk); връща масив от буфери
            data = !data ? chunk : Buffer.concat([data, chunk]); //връща буфер, първо прави проверката за null
            next();
        },
        final() {
            console.log(data);
        }
    });
    return ws;
}
/*
const rs = createReadableStream([1, 2, 3, 4, 5, 6, 7]);
const ws = createWritableStream();

rs.pipe(ws); //така връзката между двата стрийма ще бъде отворена
*/

const config = require('./config.json');
const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib'); //модул за създаване на zip
//const stream = require('stream');

const zips = zlib.createGzip();

function createUppercaseStream() {
    const ts = stream.Transform({
        transform(chunk, enc, next) {
            chunk =  Buffer.from(chunk.toString().toUpperCase());
            next(null, chunk);
        }
    });

    return ts;
}

const us = createUppercaseStream();

http.createServer(function (req, res) {
    const path = url.parse(req.url).pathname;
    if (path === '/') {
        const rs = fs.createReadStream('./web/02.NodeJSStreams/text.txt', {
            highWaterMark: 10
        }); //размер на chunk-овете
        rs.on('data', function (chunk) {
            console.log(chunk);
        });
        res.on('finish', function () {
            console.log('END');
        });
        rs.pipe(us).pipe(zips).pipe(res); //правим upperCase, правим zip, пращаме го към res
        // fs.readFile('./web/02.NodeJSStreams/text.txt', {encoding: 'utf-8'}, function (err, content) {
        //     res.end(content.toUpperCase());
        // });
    } else if (path === '/test') {
        res.end('HELLO');
    }
}).listen(config.port);