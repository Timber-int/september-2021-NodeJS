import { Request, Response } from 'express';
import { IPost } from '../entity';
import { postService } from '../services';

class PostController {
    public async postByUserId(req: Request, res: Response): Promise<Response<IPost>> {
        const { userId } = req.params;

        const post = await postService.postByUserId(Number(userId));

        if (!post) {
            return res.status(400).json(`Not post by this ${userId} id's`);
        }
        return res.json(post);
    }

    public async getAllPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const posts = await postService.getAllPosts();

        return res.json(posts);
    }

    public async updatePostByUserId(req: Request, res: Response): Promise<Response<object>> {
        const { id } = req.params;
        const { title, text } = req.body;

        await postService.updatePostByUserId(Number(id), text, title);

        return res.json('Post text updated successfully');
    }
}

export const postController = new PostController();
