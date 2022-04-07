import { NextFunction, Request, Response } from 'express';
import { userService } from '../services';
import { STATUS } from '../errorsCode';
import { MESSAGE } from '../message';
import { ErrorHandler } from '../errorHandler';
import { IUser } from '../entity';
import { passwordService } from '../services/passwordService';

class UserController {
    public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;

            const user = await userService.getUserByEmail(email);

            const normalizedUser = await passwordService.userNormalization(user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();

            users.forEach((user: IUser) => {
                passwordService.userNormalization(user);
            });

            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(Number(id));
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const userFromDB = await userService.getUserById(Number(id));

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_USER, STATUS.CODE_404));
                return;
            }

            await userService.deleteById(Number(id));
            res.json(MESSAGE.USER_DELETE_SUCCESSFULLY);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.updateById(Number(id), req.body);
            res.status(STATUS.CODE_201)
                .json(MESSAGE.USER_UPDATE_SUCCESSFULLY);
        } catch (e) {
            next();
        }
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                page,
                perPage,
                ...other
            } = req.query;

            console.log(other);

            const userPagination = await userService.getUserPagination(other, Number(page), Number(perPage));
            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
