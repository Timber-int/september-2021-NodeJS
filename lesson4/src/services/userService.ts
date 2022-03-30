import bcrypt from 'bcrypt';
import { IUser } from '../entity';
import { userRepositories } from '../repositories';
import { MESSAGE } from '../message';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const userWithHashPassword = {
            ...user,
            password: hashedPassword
        };
        const createdUser = await userRepositories.createUser(userWithHashPassword);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        const user = await userRepositories.getUserByEmail(email);
        return user;
    }

    public async getAllUsers(): Promise<IUser[]> {
        const users = await userRepositories.getAllUsers();
        return users;
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        const user = await userRepositories.getUserById(id);
        return user;
    }

    public async deleteById(id: number): Promise<object> {
        const user = await userRepositories.deleteById(id);
        return user;
    }

    public async updateById(id: number, dataToUpdate: Partial<IUser>): Promise<object> {
        const { password } = dataToUpdate;

        if (password) {
            dataToUpdate.password = await this._hashPassword(password);
        }

        return userRepositories.updateById(id, dataToUpdate);
    }

    public async compareUserPassword(password: string, passwordWithHash: string)
        : Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, passwordWithHash);

        if (!isPasswordUnique) {
            throw new Error(MESSAGE.WRONG_EMAIL_OR_PASSWORD);
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
