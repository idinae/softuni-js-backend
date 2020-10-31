module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());

    app.use('/', routers.homeRouter);
    app.use('/user', routers.userRouter);
    app.use('/items', routers.itemRouter)
};