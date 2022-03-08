import { IUser } from '../../entity/user';

export interface IUserRepository {
    createUser(user:IUser): Promise<IUser>
    getUserByEmail(email: string):Promise<IUser | undefined >
    getAllUsers():Promise<IUser[]>
    getUserById(id:number):Promise <IUser | undefined>
    deleteById(id:number):Promise <any>
}
