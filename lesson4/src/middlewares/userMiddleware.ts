import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepositories } from '../repositories';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction)
        :Promise<void> {
        try {
            const userFromDB = await userRepositories.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(404)
                    .json('User not found');
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e:any) {
            res.status(400)
                .json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
