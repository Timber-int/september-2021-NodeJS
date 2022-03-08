import { IUsers } from '../../entity/users';

export interface IUserRepository {
    createUser(user:IUsers): Promise<IUsers>
    getUserByEmail(email: string):Promise<IUsers | undefined >
}
