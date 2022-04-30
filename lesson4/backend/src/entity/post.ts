import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { Comment, IComment } from './comment';
import { CONSTANTS } from '../constants';

export interface IPost {
    title:string,
    text:string,
    userId:number,
    comments: IComment[];
}

@Entity('posts', { database: CONSTANTS.DATA_BASE })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        title:string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text:string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user:User;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments:Comment[];
}
