import { IPost } from '../../entity';

export interface IPostRepository {
    postByUserId(userId:number):Promise<IPost | undefined>
    getAllPosts():Promise<IPost[]>
    updatePostByUserId(id:number, text:string, title:string):Promise<object>
}
