import { ITokenData, IUser } from '../interface';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(createdUser: IUser): Promise<ITokenData> {
        return this._getTokenPair(createdUser);
    }

    public async _getTokenPair(user: IUser): Promise<ITokenData> {
        const {
            email,
            _id,
        } = user;

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

        return {
            accessToken,
            refreshToken,
            userId: _id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
