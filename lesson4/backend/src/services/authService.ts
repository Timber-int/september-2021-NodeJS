import { tokenService } from './tokenService';
import { IUser } from '../entity';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(createdUser: IUser): Promise<ITokenData> {
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
