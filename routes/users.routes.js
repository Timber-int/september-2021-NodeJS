const {Router} = require('express');

const userRouter = Router();
const userController = require('../controllers/user.controllers');
const usersMiddlewares = require('../middlewares/users.middlewares');

userRouter.get('/', usersMiddlewares.checkIsQueryParams, userController.getAllUsers);
userRouter.get('/:id', usersMiddlewares.checkIsUserExist, userController.getSingleUser);
userRouter.get('/delete/:id', userController.deleteUserById);

module.exports = userRouter;