import { commentRepository } from '../repositories';
import { IComment } from '../entity';

class CommentService {
    public async getAllComments():Promise<IComment[]> {
        const comments = await commentRepository.getAllComments();
        return comments;
    }

    public async getCommentByUserId(authorId:number):Promise<IComment | undefined> {
        const comment = await commentRepository.getCommentByUserId(authorId);
        return comment;
    }

    public async getCommentById(id:number):Promise<IComment | undefined> {
        const comment = await commentRepository.getCommentById(id);
        return comment;
    }

    public async sendLikeToComment(id:number, comment:IComment):Promise<object> {
        return commentRepository.sendLikeToComment(id, comment);
    }

    public async sendDislikeToComment(id:number, comment:IComment):Promise<object> {
        return commentRepository.sendDislikeToComment(id, comment);
    }
}

export const commentService = new CommentService();
