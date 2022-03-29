import { userService } from './userService';
import { tokenService } from './tokenService';
import { IUser } from '../entity';
import { ITokenData } from '../interfaces';
import { MESSAGE } from '../message';
import { emailService } from './emailService';
import { EmailActionEnum } from '../EmailInformation';

class AuthService {
    public async registration(body: IUser): Promise<ITokenData> {
        const {
            email,
            firstName,
            lastName,
        } = body;

        const userFromDbWithEmail = await userService.getUserByEmail(email);

        if (userFromDbWithEmail) {
            throw new Error(MESSAGE.EMAIL_ALREADY_EXISTS);
        }

        const createdUser = await userService.createUser(body);

        await emailService.sendMail(email, EmailActionEnum.REGISTRATION, {
            firstName,
            lastName,
        });

        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        const {
            id,
            email,
        } = userData;
        const tokenPair = await tokenService.generateTokenPair(
            {
                userId: id,
                userEmail: email,
            },
        );

        const {
            refreshToken,
            accessToken,
        } = tokenPair;

        await tokenService.saveToken(id, refreshToken, accessToken);

        return {
            accessToken,
            refreshToken,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
