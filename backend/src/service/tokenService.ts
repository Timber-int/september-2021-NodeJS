import jwt from 'jsonwebtoken';
import { IActionTokenPayload, IToken, ITokenPair, IUserPayload } from '../interface';
import { config } from '../config';
import { actionTokenModel, tokenModel } from '../dataBase';
import { TokenType } from '../constants';

class TokenService {
    public async generateTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: config.EXPIRES_IN_ACCESS });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: config.EXPIRES_IN_REFRESH });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokenToDB(token: IToken): Promise<IToken> {
        const {
            accessToken,
            refreshToken,
            userId,
        } = token;

        const tokenFromDB = await tokenModel.findOne({ userId });

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenModel.create(tokenFromDB);
        }

        return tokenModel.create(token);
    }

    public async verifyToken(token: string, tokenType: string): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === TokenType.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (tokenType === TokenType.ACTION) {
            secretWord = config.SECRET_PASSWORD_KEY;
        }

        return jwt.verify(token, secretWord as string) as IUserPayload;
    }

    public async getTokenByUserId(userId: string): Promise<IToken> {
        const token = await tokenModel.findOne({ userId });
        return token;
    }

    public async deleteUserTokenPair(userId: string): Promise<object> {
        const token = await tokenModel.deleteOne({ userId });
        return token;
    }

    public async generateActionToken(payload: IUserPayload): Promise<string> {
        const actionToken = jwt.sign(payload, config.SECRET_PASSWORD_KEY as string, { expiresIn: config.EXPIRES_IN_ACTION });
        return actionToken;
    }

    public async saveActionTokenToDB(userId: string, actionToken: string): Promise<IActionTokenPayload> {
        const actionTokenFromDB = await tokenService.getActionTokenByUserId(userId);

        if (actionTokenFromDB) {
            actionTokenFromDB.actionToken = actionToken;
            return actionTokenModel.create(actionTokenFromDB);
        }

        const savedActionToken = actionTokenModel.create({
            userId,
            actionToken,
        });
        return savedActionToken;
    }

    public async getActionTokenByUserId(userId: string): Promise<IActionTokenPayload> {
        const actionToken = await actionTokenModel.findOne({ userId });
        return actionToken;
    }

    public async deleteActionTokenByUserId(userId: string): Promise<object> {
        const actionToken = await actionTokenModel.deleteOne({ userId });
        return actionToken;
    }
}

export const tokenService = new TokenService();
