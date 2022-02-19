const {Router} = require('express');

const userRouter = require('./users.routes');
const loginRouter = require('./login.routes');
const signInRouter = require('./signIn.routes');

const routes = Router();

routes.use('/users', userRouter);
routes.use('/login', loginRouter);
routes.use('/signIn',signInRouter);

module.exports = routes;