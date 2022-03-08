import { userService } from './userService';
import { IUsers } from '../entity/users';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(body:IUsers) {
        const { email } = body;

        const userFromDbWithEmail = await userService.getUserByEmail(email);

        if (userFromDbWithEmail) {
            throw new Error(`User with email: ${email} already exists `);
        }

        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUsers) {
        const { id, email } = userData;
        const tokenPair = tokenService.generateTokenPair({ userId: id, userEmail: email });
        console.log(tokenPair);
        await tokenService.saveToken(id, tokenPair.refreshToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
