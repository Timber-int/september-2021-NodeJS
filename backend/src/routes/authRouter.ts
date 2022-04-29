import { NextFunction, Response, Router } from 'express';
import { authController } from '../controllers';
import { IRequestExtended } from '../interface';
import {
    userBodyForgotPasswordValidator,
    userBodyForRegistrationValidator,
    userBodyLoginValidator,
    userBodySetNewPasswordValidator
} from '../validator/user.validator';
import { authMiddleware, userMiddleware } from '../middlewares';
import { UserRole } from '../constants';

const router = Router();

router.post(
    '/registration',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = userBodyForRegistrationValidator;
        next();
    },
    authMiddleware.dataValidator,
    userMiddleware.checkIsUserEmailExist,
    authController.registration,
);
router.post(
    '/login',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = userBodyLoginValidator;
        req.userRoles = [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER];
        next();
    },
    authMiddleware.dataValidator,
    userMiddleware.checkIsUserExist,
    userMiddleware.checkUserRole,
    authController.login,
);

router.post('/logout', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.userRoles = [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER];
    next();
}, authMiddleware.checkAccessToken, userMiddleware.checkUserRole, authController.logout);

router.post('/refresh', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.userRoles = [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER];
    next();
}, authMiddleware.checkRefreshToken, userMiddleware.checkUserRole, authController.refresh);

router.post('/forgot/password', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = userBodyForgotPasswordValidator;
    req.userRoles = [UserRole.USER, UserRole.MANAGER];
    next();
}, authMiddleware.dataValidator, userMiddleware.checkIsUserExist, userMiddleware.checkUserRole, authController.sendMailToUserWhoForgotPassword);

router.post('/set/password', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = userBodySetNewPasswordValidator;
    req.userRoles = [UserRole.USER, UserRole.MANAGER];
    next();
}, authMiddleware.dataValidator, authMiddleware.checkActionToken, userMiddleware.checkUserRole, authController.setNewPassword);

export const authRouter = router;
