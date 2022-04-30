import { NextFunction, Response, Router } from 'express';
import { authController } from '../contorller';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';
import { IRequestExtended } from '../interfaces';
import {
    forgotPasswordValidator, loginDataValidator, setForgotPasswordValidator, userBodyForRegistrationValidator,
} from '../validator';
import { UserRole } from '../constants';

const router = Router();

router.post('/registration',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = userBodyForRegistrationValidator;
        next();
    },
    authMiddleware.dataValidator,
    userMiddleware.checkEmailAndPhoneExist,
    fileMiddleware.checkUserAvatar,
    authController.registration,
);
router.post('/login',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = loginDataValidator;
        req.userRoles = [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER];
        next();
    },
    authMiddleware.dataValidator,
    userMiddleware.checkIsUserExist,
    userMiddleware.checkUserRole,
    authController.login,
);
router.post('/logout',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.userRoles = [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER];
        next();
    },
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

router.post('/forgot/password',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = forgotPasswordValidator;
        req.userRoles = [UserRole.USER, UserRole.MANAGER];
        next();
    },
    authMiddleware.dataValidator,
    userMiddleware.checkIsUserExist,
    userMiddleware.checkUserRole,
    authController.sendMailUserWhoForgotPassword);

router.post('/forgot/password/set',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = setForgotPasswordValidator;
        req.userRoles = [UserRole.USER, UserRole.MANAGER];
        next();
    },
    authMiddleware.dataValidator,
    authMiddleware.checkActionToken,
    userMiddleware.checkUserRole,
    authController.setNewPasswordForUser);

export const authRouter = router;
