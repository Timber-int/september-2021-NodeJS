import { IComment } from '../../entity';

export interface ICommentRepository {
    createComment(body:Partial<IComment>):Promise<IComment>
    getAllComments():Promise<IComment[]>
    getCommentByUserId(authorId:number):Promise<IComment | undefined>
    getCommentById(id:number):Promise<IComment | undefined>
}
