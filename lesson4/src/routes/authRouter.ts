import { NextFunction, Response, Router } from 'express';
import { authController } from '../contorller';
import { authMiddleware, userMiddleware } from '../middlewares';
import { IRequestExtended } from '../interfaces';
import { loginDataValidator, userBodyForRegistrationValidator } from '../validator';

const router = Router();

router.post('/registration', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = userBodyForRegistrationValidator;
    next();
}, authMiddleware.dataValidator, userMiddleware.checkEmailAndPhoneExist, authController.registration,
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

export const authRouter = router;
