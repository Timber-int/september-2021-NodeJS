import { NextFunction, Response } from 'express';
import { ErrorHandler } from '../errorHandler';
import { IRequestExtended } from '../interfaces';
import { userRepositories } from '../repositories';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDB = await userRepositories.getUserByEmail(req.body.email);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkEmailAndPhoneExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDBWithEmail = await userRepositories.getUserByEmail(req.body.email);

            const userFromDBWithPhone = await userRepositories.getUserByPhone(req.body.phone);

            if (userFromDBWithEmail || userFromDBWithPhone) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PHONE, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
