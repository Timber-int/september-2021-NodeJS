import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interfaces';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('users')
            .getMany();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }

    public async deleteById(id: number): Promise<object> {
        return getManager().getRepository(User)
            .softDelete(id);
    }

    public async updateById(id: number, data: IUser): Promise<object> {
        const { email, password, phone } = data;
        return getManager().getRepository(User)
            .update({ id }, { email, phone, password });
    }
}

export const userRepositories = new UserRepository();
