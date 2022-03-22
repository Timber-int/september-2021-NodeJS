import { Request, Response } from 'express';
import { IComment } from '../entity';
import { commentService } from '../services';

class CommentController {
    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const comment = await commentService.createComment(req.body);
        return res.json(comment);
    }

    public async getAllComments(req: Request, res: Response): Promise<Response<IComment[]>> {
        const comments = await commentService.getAllComments();
        return res.json(comments);
    }

    public async getCommentByUserId(req: Request, res: Response): Promise<Response<IComment>> {
        const { authorId } = req.params;

        const comment = await commentService.getCommentByUserId(Number(authorId));

        if (!comment) {
            return res.json(`Not comment by this ${authorId} authorId`);
        }

        return res.json(comment);
    }

    public async getCommentById(req: Request, res: Response):
        Promise<Response<IComment | undefined>> {
        const { id } = req.params;

        const comment = await commentService.getCommentById(Number(id));

        if (!comment) {
            return res.json(`Not comment by this ${id} id`);
        }

        return res.json(comment);
    }

    public async standLikeOrDislikeComments(req: Request, res: Response):Promise<object> {
        try {
            const {
                commentId,
                action,
            } = req.body;

            const comment = await commentService.getCommentById(Number(commentId));

            if (!comment) {
                throw new Error('Not comment for this Id');
            }

            if (action === 'like') {
                await commentService.sendLikeToComment(Number(commentId), comment);
                return res.json(`${action} is good deal!!!`);
            }

            if (action === 'dislike') {
                await commentService.sendDislikeToComment(Number(commentId), comment);
                return res.json(`${action} is good deal!!!`);
            }

            return res.json(`Thank you for ${action}`);
        } catch (e) {
            return res.json('Error');
        }
    }
}

export const commentController = new CommentController();
