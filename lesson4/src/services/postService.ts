import { IPost } from '../entity';
import { postRepository } from '../repositories';

class PostService {
    public async postByUserId(userId:number):Promise<IPost| undefined> {
        const post = await postRepository.postByUserId(userId);
        return post;
    }

    public async getAllPosts():Promise<IPost[]> {
        const posts = await postRepository.getAllPosts();
        return posts;
    }

    public async updatePostByUserId(userId:number, text:string, title:string):Promise<object> {
        const updatedPost = await postRepository.updatePostByUserId(userId, text, title);
        return updatedPost;
    }
}

export const postService = new PostService();
