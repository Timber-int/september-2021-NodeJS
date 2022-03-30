import { EntityRepository, getManager, Repository } from 'typeorm';
import { ActionToken, IActionToken } from '../../entity';
import { IActionTokenRepository } from './actionTokenRepositoryInterface';
import { IActionTokenDataToSave } from '../../interfaces';

EntityRepository(ActionToken);

class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async saveActionTokenToDB(actionToken: IActionTokenDataToSave): Promise<IActionToken> {
        return getManager()
            .getRepository(ActionToken)
            .save(actionToken);
    }

    public async findActionTokenByUserId(userId: number): Promise<IActionToken | undefined> {
        return getManager()
            .getRepository(ActionToken)
            .findOne({ userId });
    }

    public async deleteActionTokenByUserId(userId: number): Promise<object> {
        return getManager()
            .getRepository(ActionToken)
            .delete({ userId });
    }
}

export const actionTokenRepository = new ActionTokenRepository();
