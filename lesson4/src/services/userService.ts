import bcrypt from 'bcrypt';
import { IUser } from '../entity/user';
import { userRepositories } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const userWithHashPassword = { ...user, password: hashedPassword };
        const createdUser = await userRepositories.createUser(userWithHashPassword);
        return createdUser;
    }

    public async getUserByEmail(email: string):Promise<IUser | undefined> {
        const user = await userRepositories.getUserByEmail(email);
        return user;
    }

    public async getAllUsers():Promise<IUser[]> {
        const users = await userRepositories.getAllUsers();
        return users;
    }

    public async getUserById(id:number):Promise<IUser | undefined> {
        const user = await userRepositories.getUserById(id);
        return user;
    }

    public async deleteById(id:number):Promise<object> {
        const user = await userRepositories.deleteById(id);
        return user;
    }

    public async updateById(id:number, data:IUser):Promise<object> {
        const { password } = data;
        const hashedPassword = await this._hashPassword(password);
        const userWithHashPassword = { ...data, password: hashedPassword };
        const user = await userRepositories.updateById(id, userWithHashPassword);
        return user;
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
export const userService = new UserService();
