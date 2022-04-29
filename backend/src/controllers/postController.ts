import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { postModel } from '../dataBase';
import { postService } from '../service';

class PostController {
    public async getAllPost(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const posts = await postModel.find({})
                .populate('userId');

            res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    public async createPost(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const post = await postService.createPost(req.body, req.files);

            res.json(post);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostController();
