import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { CONSTANTS, TokenType } from '../constants';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const accessToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler(MESSAGE.NOT_TOKEN, STATUS.CODE_404));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(accessToken, TokenType.ACCESS);

            const tokenPairFromDB = await tokenRepository.findAccessToken(accessToken);

            if (!tokenPairFromDB) {
                next(new ErrorHandler(MESSAGE.TOKEN_NOT_VALID, STATUS.CODE_401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
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

            await tokenService.deleteUserTokenPair({ userId });

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
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

            const actionTokenFromDB = await actionTokenRepository.findActionTokenByUserId(userId);

            if (!actionTokenFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            const userFromActionToken = await userService.getUserByEmail(userEmail);

            if (!userFromActionToken) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            req.user = userFromActionToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async dataValidator(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
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
}

export const authMiddleware = new AuthMiddleware();
