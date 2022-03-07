import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { Users } from './users';
import { Comments, IComments } from './comments';

export interface IPosts {
    title:string,
    text:string,
    userId:number,
    comments: IComments[];
}

@Entity('posts', { database: 'okten' })
export class Posts extends CommonFields implements IPosts {
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

    @ManyToOne(() => Users, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user:Users;

    @OneToMany(() => Comments, (comment) => comment.post)
        comments:Comments[];
}
