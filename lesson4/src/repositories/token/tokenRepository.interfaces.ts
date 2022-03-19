import { IToken } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';

export interface ITokenRepository {
    saveTokensToDB(token:ITokenDataToSave):Promise<IToken>
    findTokenByUserId(userId:number):Promise<IToken | undefined>
    deleteUserTokenPair(userId:number):Promise<object>
   findAccessToken(accessToken:string):Promise<IToken | undefined>
}
