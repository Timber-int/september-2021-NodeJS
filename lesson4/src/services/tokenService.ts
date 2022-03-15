import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IToken } from '../entity';
import { ITokenPair, IUserPayload } from '../interfaces';
import { tokenRepository } from '../repositories';
import { TokenType } from '../constants';

class TokenService {
    public async generateTokenPair(payload: IUserPayload)
        : Promise<ITokenPair> {
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

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);

        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        const token = await tokenRepository.createToken({
            refreshToken,
            userId,
        });
        return token;
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteUserTokenPair(userId);
    }

    public async verifyToken(authToken: string, tokenType = TokenType.ACCESS)
        :Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === TokenType.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
