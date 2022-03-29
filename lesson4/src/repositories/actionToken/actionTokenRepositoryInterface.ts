import { IActionTokenDataToSave } from '../../interfaces';
import { IActionToken } from '../../entity';

export interface IActionTokenRepository {
    saveActionTokenToDB(actionToken: IActionTokenDataToSave): Promise<IActionToken>
    findActionTokenByUserId(userId: number): Promise<IActionToken | undefined>
}
