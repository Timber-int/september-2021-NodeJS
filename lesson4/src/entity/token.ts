import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { User } from './user';
import { CommonFields, ICommonFields } from './commonFields';

export interface IToken extends ICommonFields{
    refreshToken:string,
    accessToken:string,
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
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        accessToken:string;

    @Column({
        type: 'int',
    })
        userId: number;

   @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
       user:User;
}
