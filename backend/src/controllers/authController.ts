import { NextFunction, Response } from 'express';
import { authService, passwordService, userService } from '../service';
import { IRequestExtended, IUser } from '../interface';
import { emailService } from '../service/emailService';
import { EmailActionEnum } from '../emailInformation';
import { tokenService } from '../service/tokenService';
import { MESSAGE } from '../message';

class AuthController {
    public async registration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {

            const {
                firstName,
                lastName,
                email,
            } = req.body;

            const createdUser = await userService.createUser(req.body);

            const tokenData = await authService.registration(createdUser);

            await emailService.sendMail(email, EmailActionEnum.REGISTRATION, {
                firstName,
                lastName,
            });

            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                password,
            } = req.body;

            const {
                _id,
                password: hashPassword,
                email,
            } = req.user as IUser;

            await userService.comparePassword(password, hashPassword);

            const tokenPair = await tokenService.generateTokenPair({
                userId: _id,
                userEmail: email,
            });

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            await tokenService.saveTokenToDB({
                accessToken,
                refreshToken,
                userId: _id,
            });

            const normalizedUser = await passwordService.userNormalization(req.user);

            res.json({
                accessToken,
                refreshToken,
                user: normalizedUser,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                _id,
                firstName,
                lastName,
            } = req.user as IUser;

            await tokenService.deleteUserTokenPair(_id);

            res.json(`${MESSAGE.BY_USER} ${firstName} ${lastName}`);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                _id,
                email,
            } = req.user as IUser;

            const tokenPair = await tokenService.generateTokenPair({
                userId: _id,
                userEmail: email,
            });

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            await tokenService.saveTokenToDB({
                accessToken,
                refreshToken,
                userId: _id,
            });

            const normalizedUser = await passwordService.userNormalization(req.user);

            res.json({
                accessToken,
                refreshToken,
                user: normalizedUser,
            });
        } catch (e) {
            next(e);
        }
    }

    public async sendMailToUserWhoForgotPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                _id,
                email,
            } = req.user as IUser;

            const actionToken = await tokenService.generateActionToken({
                userId: _id,
                userEmail: email,
            });

            await tokenService.saveActionTokenToDB(_id, actionToken);

            const normalizedUser = await passwordService.userNormalization(req.user);

            res.json({
                actionToken,
                user: normalizedUser,
            });
        } catch (e) {
            next(e);
        }
    }

    public async setNewPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                _id,
            } = req.user as IUser;

            await userService.updateUser(_id, req.body);

            await tokenService.deleteActionTokenByUserId(_id);

            const normalizedUser = await passwordService.userNormalization(req.user);

            res.json({
                user: normalizedUser,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
