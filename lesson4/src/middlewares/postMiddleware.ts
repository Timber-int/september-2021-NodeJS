import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { postService, userService } from '../services';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';

class PostMiddleware {
    public async checkIsUserByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.body;

            const user = await userService.getUserById(Number(userId));

            if (!user) {
                next(new ErrorHandler(MESSAGE.NOT_AUTHOR_POST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsPostTitleUnique(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title } = req.body;

            const post = await postService.fiendPostByTitle(title);

            if (post) {
                next(new ErrorHandler(MESSAGE.UNIQUE_TITLE, STATUS.CODE_403));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
