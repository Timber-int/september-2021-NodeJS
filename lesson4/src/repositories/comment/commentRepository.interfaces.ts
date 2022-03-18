import { IComment } from '../../entity';

export interface ICommentRepository {
    getAllComments():Promise<IComment[]>
    getCommentByUserId(authorId:number):Promise<IComment | undefined>
    getCommentById(id:number):Promise<IComment | undefined>
}
