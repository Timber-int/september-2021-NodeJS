import { EntityRepository, getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';

import { ITokenRepository } from './tokenRepository.interfaces';

EntityRepository(Token);
class TokenRepository extends Repository<Token>implements ITokenRepository {
    public async saveTokensToDB(token:ITokenDataToSave):Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId:number):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteUserTokenPair(userId:number):Promise<object> {
        return getManager().getRepository(Token).delete({ userId });
    }

    public async findAccessToken(accessToken:string):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ accessToken });
    }
}

export const tokenRepository = new TokenRepository();
