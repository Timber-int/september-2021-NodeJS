import { ITokenDataToSave } from '../../interfaces/token.interface';
import { IToken } from '../../entity/token';

export interface ITokenRepository {
    createToken(token:ITokenDataToSave):Promise<IToken>
    findTokenByUserId(userId:number):Promise<IToken | undefined>
}
