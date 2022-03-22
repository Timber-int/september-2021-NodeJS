import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { postService, userService } from '../services';

class PostMiddleware {
    public async checkIsUserByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.body;

            const user = await userService.getUserById(Number(userId));

            if (!user) {
                throw new Error(`There is no user with ${userId} id who wrote this post`);
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }

    public async checkIsPostTitleUnique(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title } = req.body;

            const post = await postService.fiendPostByTitle(title);

            if (post) {
                throw new Error(`${title} must by a unique`);
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }
}

export const postMiddleware = new PostMiddleware();
