import { EntityRepository, getManager, Repository } from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepository.interfaces';

EntityRepository(Post);
class PostRepository extends Repository<Post> implements IPostRepository {
    public async postByUserId(userId:number):Promise<IPost| undefined> {
        const post = await getManager().getRepository(Post).findOne({ userId });
        return post;
    }

    public async getAllPosts():Promise<IPost[]> {
        const posts = await getManager().getRepository(Post).find();
        return posts;
    }

    public async updatePostByUserId(id:number, text:string, title:string):Promise<object> {
        const post = await getManager().getRepository(Post).update({ id }, { text, title });
        return post;
    }
}

export const postRepository = new PostRepository();
