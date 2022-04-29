// import fs from 'fs';
// import path from 'path';
import { IPost } from '../interface';
import { postModel } from '../dataBase';
import { fileService } from './fileService';

class PostService {
    public async createPost(post: IPost, picture: any): Promise<IPost> {
        const file = fileService.saveFile(picture);

        // await fs.readFile(path.join(__dirname, '../', 'fileDirectory', file), (err, data) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log(JSON.stringify(data));
        // });
        const createdPost = await postModel.create({
            ...post,
            picture: file,
        });
        return createdPost;
    }
}

export const postService = new PostService();
