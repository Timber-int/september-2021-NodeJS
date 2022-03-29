import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IActionToken, IToken } from '../entity';
import { ITokenPair, IUserPayload } from '../interfaces';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { TokenType } from '../constants';

class TokenService {
    public generateTokenPair(payload: IUserPayload)
        : ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS as string },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH as string },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string, accessToken: string)
        : Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);

        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.saveTokensToDB(tokenFromDb);
        }

        const token = await tokenRepository.saveTokensToDB({
            accessToken,
            refreshToken,
            userId,
        });
        return token;
    }

    public async deleteUserTokenPair(paramsForDelete: Partial<IToken>): Promise<object> {
        return tokenRepository.deleteUserTokenPairByParams(paramsForDelete);
    }

    public async verifyToken(authToken: string, tokenType: string)
        : Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === TokenType.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }

    public async generateActionToken(payload: IUserPayload): Promise<string> {
        const actionToken = jwt.sign(payload, config.SECRET_PASSWORD_KEY as string, { expiresIn: config.EXPIRES_IN_ACTION });
        return actionToken;
    }

    public async saveActionToken(userId: number, actionToken: string)
        : Promise<IActionToken> {
        const actionTokenFromDb = await actionTokenRepository.findActionTokenByUserId(userId);

        if (actionTokenFromDb) {
            actionTokenFromDb.actionToken = actionToken;

            return actionTokenRepository.saveActionTokenToDB(actionTokenFromDb);
        }

        const actionTokenNew = await actionTokenRepository.saveActionTokenToDB({
            actionToken,
            userId,
        });

        return actionTokenNew;
    }
}

export const tokenService = new TokenService();
