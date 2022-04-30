import { NextFunction, Request, Response } from 'express';
import { postService } from '../services';
import { MESSAGE } from '../message';
import { ErrorHandler } from '../errorHandler';
import { STATUS } from '../errorsCode';

class PostController {
    public async createPost(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const post = await postService.createPost(req.body);

            res.json(post);
        } catch (e) {
            next(e);
        }
    }

    public async postByUserId(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { userId } = req.params;

            const post = await postService.postByUserId(Number(userId));

            if (!post) {
                next(new ErrorHandler(MESSAGE.NOT_POST, STATUS.CODE_404));
                return;
            }
            res.json(post);
        } catch (e) {
            next(e);
        }
    }

    public async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const posts = await postService.getAllPosts();

            res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    public async updatePostById(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const {
                text,
            } = req.body;

            await postService.updatePostById(Number(id), text);

            res.json(MESSAGE.POST_TEXT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostController();
