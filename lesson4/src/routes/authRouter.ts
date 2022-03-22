import { Router } from 'express';
import { authController } from '../contorller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration',
    userMiddleware.checkEmailAndPhoneExist,
    authMiddleware.checkDataValidationToRegistration,
    userMiddleware.checkUserBodyValid,
    authController.registration,
);
router.post('/login',
    authMiddleware.checkDataValidationToLogin,
    userMiddleware.checkIsUserExist,
    authController.login,
);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
