import { IUser } from '../../entity';

export interface IUserRepository {
    createUser(user:IUser): Promise<IUser>
    getUserByEmail(email: string):Promise<IUser | undefined >
    getUserByPhone(phone: string): Promise<IUser | undefined>
    getAllUsers():Promise<IUser[]>
    getUserById(id:number):Promise <IUser | undefined>
    deleteById(id:number):Promise <object>
    updateById(id: number, user: Partial<IUser>): Promise<object>
    getNewUsers(): Promise<IUser[]>
}
