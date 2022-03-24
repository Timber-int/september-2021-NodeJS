import { NextFunction, Request, Response } from 'express';
import { COOKIE } from '../constants';
import { IRequestExtended } from '../interfaces';
import { authService, tokenService, userService } from '../services';
import { IUser } from '../entity';
import { MESSAGE } from '../message';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await authService.registration(req.body);
            res.cookie(
                COOKIE.nameRefreshToken,
                data.refreshToken,
                {
                    maxAge: COOKIE.maxAgeRefreshToken,
                    httpOnly: true,
                },
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id,
                email,
                password: hashPassword,
            } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const tokenPair = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            await tokenService.saveToken(id, refreshToken, accessToken);

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;

            res.clearCookie(COOKIE.nameRefreshToken);

            await tokenService.deleteUserTokenPair({ userId: id });

            res.json(`${MESSAGE.BY_USER} ${req.user?.firstName}`);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;

            const {
                id,
                email,
            } = user;

            const tokenPair = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            await tokenService.saveToken(id, refreshToken, accessToken);

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
