const {Router} = require('express');

const loginController = require('../controllers/login.controllers');

const loginMiddlewares = require('../middlewares/login.middlewares');
const signInMiddlewares = require('../middlewares/signIn.middlewares');

const loginRouter = Router();

loginRouter.get('/', loginController.loginPage);
loginRouter.post(
    '/',
    loginMiddlewares.checkIsUserBodyValid,
    loginMiddlewares.isEmailExist,
    signInMiddlewares.checkIsPasswordAndEmailValid,
    loginController.loginPassed
);

module.exports = loginRouter;