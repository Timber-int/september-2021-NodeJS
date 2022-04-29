import { NextFunction, Response } from 'express';
import { CONSTANTS, TokenType } from '../constants';
import { IRequestExtended } from '../interface';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';
import { tokenService } from '../service/tokenService';
import { userService } from '../service';

class AuthMiddleware {
    public async dataValidator(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const validationType = req.chosenValidationType;

            const {
                error,
                value,
            } = validationType.validate(req.body);

            if (error) {
                throw new Error(`${error?.message}`);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const {
                userEmail,
                userId,
            } = await tokenService.verifyToken(accessToken, TokenType.ACCESS);

            const tokenFromDB = await tokenService.getTokenByUserId(userId);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!refreshToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const {
                userEmail,
                userId,
            } = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);

            const tokenFromDB = await tokenService.getTokenByUserId(userId);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            await tokenService.deleteUserTokenPair(userId);

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const {
                userEmail,
                userId,
            } = await tokenService.verifyToken(actionToken, TokenType.ACTION);

            const tokenFromDB = await tokenService.getActionTokenByUserId(userId);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
