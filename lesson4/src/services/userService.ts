import { getManager } from 'typeorm';
import { IUsers, Users } from '../entity/users';

class UserService {
    public async createUser(user:IUsers):Promise<IUsers> {
        const createdUser = await getManager().getRepository(Users).save(user);
        return createdUser;
    }
}
export const userService = new UserService();
