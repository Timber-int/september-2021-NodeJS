import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { CONSTANTS, TokenType } from '../constants';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!accessToken) {
                throw new Error('Not token');
            }

            const { userEmail } = await tokenService.verifyToken(accessToken, TokenType.ACCESS);

            const tokenPairFromDB = await tokenRepository.findAccessToken(accessToken);

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Wrong token');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(CONSTANTS.AUTHORIZATION);

            if (!refreshToken) {
                throw new Error('Not token');
            }

            const { userEmail, userId } = await
            tokenService.verifyToken(refreshToken, TokenType.REFRESH);

            await tokenService.deleteUserTokenPair({ userId });

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Wrong token');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
