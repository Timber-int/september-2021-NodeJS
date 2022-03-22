import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { postService, userService } from '../services';

class CommentMiddleware {
    public async checkIsAuthorComment(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { authorId } = req.body;

            const userFromDB = await userService.getUserById(Number(authorId));

            if (!userFromDB) {
                throw new Error('AuthorId is not correct');
            }

            next();
        } catch (e: any) {
            res.json(e.message);
        }
    }

    public async checkIsPostComment(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { postId } = req.body;

            const postFromDB = await postService.getPostById(Number(postId));

            if (!postFromDB) {
                throw new Error('PostId is not correct');
            }

            next();
        } catch (e: any) {
            res.json(e.message);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
