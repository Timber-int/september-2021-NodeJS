import bcrypt from 'bcrypt';
import { IUsers } from '../entity/users';
import { userRepositories } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUsers):Promise<IUsers> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const userWithHashPassword = { ...user, password: hashedPassword };
        const createdUser = await userRepositories.createUser(userWithHashPassword);
        return createdUser;
    }

    public async getUserByEmail(email: string):Promise<IUsers | undefined> {
        const user = await userRepositories.getUserByEmail(email);
        return user;
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
export const userService = new UserService();
