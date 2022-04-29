import { Request } from 'express';
import { IUser } from './interface';

export interface IRequestExtended extends Request {
    user?: IUser,
    chosenValidationType?: any,
    userRoles?: string[] ;
}
