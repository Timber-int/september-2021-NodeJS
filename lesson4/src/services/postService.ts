import { IPost } from '../entity';
import { postRepository } from '../repositories';

class PostService {
    public async createPost(body:IPost):Promise<IPost> {
        const post = await postRepository.createPost(body);
        return post;
    }

    public async fiendPostByTitle(title: Partial<IPost>):Promise<IPost| undefined> {
        const post = await postRepository.fiendPostByTitle(title);
        return post;
    }

    public async postByUserId(userId:number):Promise<IPost| undefined> {
        const post = await postRepository.postByUserId(userId);
        return post;
    }

    public async getAllPosts():Promise<IPost[]> {
        const posts = await postRepository.getAllPosts();
        return posts;
    }

    public async updatePostById(id:number, text:string, title:string):Promise<object> {
        const updatedPost = await postRepository.updatePostById(id, text, title);
        return updatedPost;
    }
}

export const postService = new PostService();
