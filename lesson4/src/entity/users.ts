import {Column, Entity, OneToMany} from 'typeorm';
import { CommonFields } from './commonFields';
import {Posts} from "./posts";

export interface IUsers {
    firstName: string,
    lastName: string,
    age?: number,
    phone: string,
    email: string,
    password: string;
}

@Entity('users', { database: 'okten' })
export class Users extends CommonFields implements IUsers {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;

    @OneToMany(() => Posts, (post) => post.user)
        posts:Posts[];
}
