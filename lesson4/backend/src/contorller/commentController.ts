import { NextFunction, Request, Response } from 'express';
import { commentService } from '../services';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';

class CommentController {
    public async createComment(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const comment = await commentService.createComment(req.body);
            res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    public async getAllComments(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const comments = await commentService.getAllComments();
            res.json(comments);
        } catch (e) {
            next(e);
        }
    }

    public async getCommentByUserId(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { authorId } = req.params;

            const comment = await commentService.getCommentByUserId(Number(authorId));

            if (!comment) {
                next(new ErrorHandler(MESSAGE.NOT_COMMENT_AUTHOR_ID, STATUS.CODE_400));
                return;
            }

            res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    public async getCommentById(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const comment = await commentService.getCommentById(Number(id));

            if (!comment) {
                next(new ErrorHandler(MESSAGE.NOT_COMMENT_ID, STATUS.CODE_404));
                return;
            }

            res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    public async standLikeOrDislikeComments(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                commentId,
                action,
            } = req.body;

            const comment = await commentService.getCommentById(Number(commentId));

            if (!comment) {
                next(new ErrorHandler(MESSAGE.NOT_COMMENT_ID, STATUS.CODE_404));
                return;
            }

            if (action === MESSAGE.LIKE) {
                await commentService.sendLikeToComment(Number(commentId), comment);
                res.json(`${action} ${MESSAGE.GOOD_DEAL}`);
                return;
            }

            if (action === MESSAGE.DISLIKE) {
                await commentService.sendDislikeToComment(Number(commentId), comment);
                res.json(`${action} ${MESSAGE.GOOD_DEAL}`);
                return;
            }

            res.json(`${MESSAGE.THANK_YOU_FOR} ${action}`);
        } catch (e) {
            next(e);
        }
    }
}

export const commentController = new CommentController();
