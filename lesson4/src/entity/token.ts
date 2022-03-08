import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { Users } from './users';
import { CommonFields } from './commonFields';

export interface IToken {
    refreshToken:string,
    userId:number
}

@Entity('token', { database: 'okten' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken:string;

    @Column({
        type: 'int',
    })
        userId: number;

   @OneToOne(() => Users)
    @JoinColumn({ name: 'userId' })
       user:Users;
}
