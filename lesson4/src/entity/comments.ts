import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { Users } from './users';
import { Posts } from './posts';

export interface IComments {
    text: string,
    authorId: number,
    postId: number,
    like: number,
    dislike: number,
}

@Entity('comments', { database: 'okten' })
export class Comments extends CommonFields implements IComments {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text:string;

    @Column({
        type: 'int',
    })
        authorId:number;

    @Column({
        type: 'int',
    })
        postId:number;

    @Column({
        type: 'int',
        default: 0,
    })
        like:number;

    @Column({
        type: 'int',
        default: 0,
    })
        dislike:number;

    @ManyToOne(() => Users, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user:Users[];

    @ManyToOne(() => Posts, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Posts;
}
