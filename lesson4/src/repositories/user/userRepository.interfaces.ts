import { IUser } from '../../entity';
import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository {
    createUser(user:IUser): Promise<IUser>
    getUserByEmail(email: string):Promise<IUser | undefined >
    getUserByPhone(phone: string): Promise<IUser | undefined>
    getAllUsers():Promise<IUser[]>
    getUserById(id:number):Promise <IUser | undefined>
    deleteById(id:number):Promise <object>
    updateById(id: number, user: Partial<IUser>): Promise<object>
    getNewUsers(): Promise<IUser[]>
    getUserPagination(searchObject: Partial<IUser>, limit: number, page: number): Promise<IPaginationResponse<IUser>>
}
