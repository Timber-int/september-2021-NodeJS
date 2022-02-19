const {Router} = require('express');

const signInRouter = Router();

const signInController = require('../controllers/signIn.controllers');
const signInMiddlewares = require('../middlewares/signIn.middlewares');

signInRouter.get('/', signInController.signInPage);
signInRouter.post(
    '/',
    signInMiddlewares.checkIsEmailAndPasswordExist,
    signInMiddlewares.checkIsPasswordAndEmailValid,
    signInController.renderUserContent
);

module.exports = signInRouter;