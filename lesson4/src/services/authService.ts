import { userService } from './userService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces/token.interface';

class AuthService {
    public async registration(body:IUser):Promise<ITokenData> {
        const { email } = body;

        const userFromDbWithEmail = await userService.getUserByEmail(email);

        if (userFromDbWithEmail) {
            throw new Error(`User with email: ${email} already exists `);
        }

        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser):Promise<ITokenData> {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });

        await tokenService.saveToken(id, tokenPair.refreshToken);

        return {
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
