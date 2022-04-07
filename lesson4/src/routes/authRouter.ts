import { NextFunction, Response, Router } from 'express';
import { authController } from '../contorller';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';
import { IRequestExtended } from '../interfaces';
import {
    forgotPasswordValidator, loginDataValidator, setForgotPasswordValidator, userBodyForRegistrationValidator,
} from '../validator';

const router = Router();

router.post('/registration', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = userBodyForRegistrationValidator;
    next();
}, authMiddleware.dataValidator, userMiddleware.checkEmailAndPhoneExist, fileMiddleware.checkUserAvatar, authController.registration,
);
router.post('/login',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = loginDataValidator;
        next();
    },
    authMiddleware.dataValidator,
    userMiddleware.checkIsUserExist,
    authController.login,
);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

router.post('/forgot/password', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = forgotPasswordValidator;
    next();
}, authMiddleware.dataValidator, userMiddleware.checkIsUserExist, authController.sendMailUserWhoForgotPassword);

router.post('/forgot/password/set', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = setForgotPasswordValidator;
    next();
}, authMiddleware.dataValidator, authMiddleware.checkActionToken, authController.setNewPasswordForUser);

export const authRouter = router;
