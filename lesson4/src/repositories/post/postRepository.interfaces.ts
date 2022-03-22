import { IPost } from '../../entity';

export interface IPostRepository {
    getPostById(id:number):Promise<IPost | undefined>
    createPost(body:IPost):Promise<IPost>
    postByUserId(userId:number):Promise<IPost | undefined>
    getAllPosts():Promise<IPost[]>
    updatePostById(id:number, text: string): Promise<object>
    fiendPostByTitle(params: Partial<IPost>):Promise<IPost| undefined>
}
