import { NextFunction, Response } from 'express';
import { ErrorHandler } from '../errorHandler';
import { STATUS } from '../errorsCode';
import { IRequestExtended, IUser } from '../interface';
import { MESSAGE } from '../message';
import { userService } from '../service';

class UserMiddleware {
    public async checkIsUserEmailExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            const userFromDB = await userService.getUserByEmail(email);

            if (userFromDB) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserRole(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const rolesArray = req.userRoles;

            const { role } = req.user as IUser;

            if (role) {
                if (!rolesArray?.includes(role)) {
                    next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                    return;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            const userFromDB = await userService.getUserByEmail(email);

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
}

export const userMiddleware = new UserMiddleware();
