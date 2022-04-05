import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { COOKIE } from '../constants';
import { IRequestExtended } from '../interfaces';
import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { IUser } from '../entity';
import { MESSAGE } from '../message';
import { EmailActionEnum } from '../EmailInformation';
import { actionTokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email,
                firstName,
                lastName,
            } = req.body;

            const avatar = req.files?.avatar as UploadedFile;

            const createdUser = await userService.createUser(req.body);

            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);

                console.log(sendData.Location);
            }

            await emailService.sendMail(email, EmailActionEnum.REGISTRATION, {
                firstName,
                lastName,
            });

            const tokenData = await authService.registration(createdUser);

            res.json(tokenData);
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
                firstName,
                lastName,
            } = req.user as IUser;

            const { password } = req.body;

            await emailService.sendMail(email, EmailActionEnum.LOGIN, {
                firstName,
                lastName,
            });

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
            const {
                id,
                firstName,
                lastName,
                email,
            } = req.user as IUser;

            res.clearCookie(COOKIE.nameRefreshToken);

            await tokenService.deleteUserTokenPair({ userId: id });

            await emailService.sendMail(email, EmailActionEnum.LOGOUT, {
                firstName,
                lastName,
            });

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

    public async sendMailUserWhoForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;

            const {
                id,
                email,
            } = user;

            const actionToken = await tokenService.generateActionToken({
                userId: id,
                userEmail: email,
            });

            await tokenService.saveActionToken(id, actionToken);

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                { forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}` },
            );

            res.json({
                actionToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async setNewPasswordForUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;

            const {
                id,
                firstName,
                email,
                lastName,
            } = user;
            await userService.updateById(id, req.body);

            await actionTokenRepository.deleteActionTokenByUserId(id);

            await emailService.sendMail(email, EmailActionEnum.CHANGE_PASSWORD, {
                firstName,
                lastName,
            });

            res.json(`${firstName} ${MESSAGE.YOU_PASSWORD_UPDATED_SUCCESSFULLY}`);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
