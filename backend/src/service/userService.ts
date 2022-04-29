import bcrypt from 'bcrypt';
import { IUser } from '../interface';
import { userModel } from '../dataBase';
import { MESSAGE } from '../message';

class UserService {
    public async createUser(body: IUser): Promise<IUser> {

        const { password } = body;

        const hashedPassword = await this._hashPassword(password);

        const userWithHashPassword = {
            ...body,
            password: hashedPassword,
        };

        return userModel.create(userWithHashPassword);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userModel.findOne({ email })
            .lean();
    }

    public async updateUser(userId: string, dataToUpdate: Partial<IUser>): Promise<object> {
        const { password } = dataToUpdate;

        if (password) {
            dataToUpdate.password = await this._hashPassword(password);
        }

        return userModel.findOneAndUpdate({ _id: userId }, dataToUpdate) as object;
    }

    public async comparePassword(password: string, hashPassword: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hashPassword);

        if (!isPasswordUnique) {
            throw new Error(MESSAGE.WRONG_EMAIL_OR_PASSWORD);
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 15);
    }
}

export const userService = new UserService();
