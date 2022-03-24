import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { postService, userService } from '../services';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';

class CommentMiddleware {
    public async checkIsAuthorComment(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { authorId } = req.body;

            const userFromDB = await userService.getUserById(Number(authorId));

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.BAD_AUTHOR_ID,STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
           next(e);
        }
    }

    public async checkIsPostComment(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { postId } = req.body;

            const postFromDB = await postService.getPostById(Number(postId));

            if (!postFromDB) {
                next(new ErrorHandler(MESSAGE.BAD_POST_ID, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
