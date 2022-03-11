import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IToken } from '../entity/token';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { ITokenPair, IUserPayload } from '../interfaces/token.interface';

class TokenService {
    public async generateTokenPair(payload:IUserPayload)
        :Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId:number, refreshToken:string):Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);

        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        const token = await tokenRepository.createToken({ refreshToken, userId });
        return token;
    }
}

export const tokenService = new TokenService();
