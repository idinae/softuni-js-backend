const http = require('http');
const url = require('url');

function methodHandlerFactory(handlers, method) {
    return function (path, ...fns) {
        handlers[method][path] = fns;
    }
}

function iterateAndExecHandler(req, res, handlersArray) {
    const fn = handlersArray[0];
    if (!fn) {done(req, res); return;}
    fn(req, res, function(err) {
        if (err) { console.log(err); return; }
        iterateAndExecHandler(req, res, handlersArray.slice(1));
    });
}


module.exports = function () {
    const handlers = {
        get: {},
        post: {},
        delete: {},
        putt: {}
    };

    const server = http.createServer(function (req, res) {
        const {
            path,
            query
        } = url.parse(req.url, true);
        const method = req.method.toLocaleLowerCase();
        const reqHandlers = handlers[method][path];

        if (!reqHandlers) {
            res.end(`Route ${method} ${path} not found`);
            return;
        }

        iterateAndExecHandler(req, res, reqHandlers)
        //reqHandlers.forEach(fn => fn(req, res));
        //reqHandler(req, res);
    });

    return {
        listen: server.listen.bind(server),
        get: methodHandlerFactory(handlers, 'get'),
        post: methodHandlerFactory(handlers, 'post')
        // get(path, handler) {
        //     handlers.get[path] = handler;
        // },
        // post(path, handler) {
        //     handlers.post[path] = handler;
        // }
    }
}