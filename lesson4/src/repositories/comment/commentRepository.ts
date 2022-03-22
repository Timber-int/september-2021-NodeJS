import { EntityRepository, getManager, Repository } from 'typeorm';
import { Comment, IComment } from '../../entity';
import { ICommentRepository } from './commentRepository.interfaces';

EntityRepository(Comment);
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async createComment(body:Partial<IComment>):Promise<IComment> {
        const comment = await getManager().getRepository(Comment).save(body);
        return comment;
    }

    public async getAllComments():Promise<IComment[]> {
        const comments = await getManager().getRepository(Comment).find();
        return comments;
    }

    public async getCommentByUserId(authorId:number):Promise<IComment | undefined> {
        const comment = await getManager().getRepository(Comment).findOne({ authorId });
        return comment;
    }

    public async getCommentById(id:number):Promise<IComment | undefined> {
        const comment = await getManager().getRepository(Comment).findOne({ id });
        return comment;
    }

    public async sendLikeToComment(id:number, comment:IComment):Promise<object> {
        return getManager().getRepository(Comment)
            .update({ id }, { like: comment.like + 1 });
    }

    public async sendDislikeToComment(id:number, comment:IComment):Promise<object> {
        return getManager().getRepository(Comment)
            .update({ id }, { dislike: comment.dislike + 1 });
    }
}

export const commentRepository = new CommentRepository();
