import { IToken } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';

export interface ITokenRepository {
    saveTokensToDB(token: ITokenDataToSave): Promise<IToken>;

    findTokenByUserId(userId: number): Promise<IToken | undefined>;

    deleteUserTokenPairByParams(paramsForDelete: Partial<IToken>): Promise<object>;

    findAccessToken(accessToken: string): Promise<IToken | undefined>;
}
