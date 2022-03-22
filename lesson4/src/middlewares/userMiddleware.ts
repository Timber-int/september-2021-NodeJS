import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepositories } from '../repositories';

class UserMiddleware {
    public async checkUserBodyValid(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const {
                firstName,
                lastName,
                age,
                phone,
                email,
            } = req.body;

            if (!email) {
                throw new Error('Email is required!!!');
            }

            if (!firstName) {
                throw new Error('First name is required!!!');
            }
            if (!lastName) {
                throw new Error('Last name is required!!!');
            }

            if (!phone) {
                throw new Error('Phone is required!!!');
            }

            if (age < 12 && age > 120) {
                throw new Error('Wrong age is not valid!!!');
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }

    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const userFromDB = await userRepositories.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(404)
                    .json('User is already exist');
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }

    public async checkEmailAndPhoneExist(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const userFromDBWithEmail = await userRepositories.getUserByEmail(req.body.email);

            const userFromDBWithPhone = await userRepositories.getUserByPhone(req.body.phone);

            if (userFromDBWithEmail || userFromDBWithPhone) {
                res.status(404)
                    .json('Wrong email or phone');
                return;
            }
            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
