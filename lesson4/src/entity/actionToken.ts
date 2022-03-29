import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CONSTANTS } from '../constants';
import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user';

export interface IActionToken extends ICommonFields {
    actionToken: string,
    userId: number
}

@Entity('actiontokens', { database: CONSTANTS.DATA_BASE })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}

