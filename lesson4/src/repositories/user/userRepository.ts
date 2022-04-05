import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interfaces';
import { IPaginationResponse } from '../../interfaces';

dayjs.extend(utc);

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager()
            .getRepository(User)
            .save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager()
            .getRepository(User)
            .findOne(
                { email },
                {
                    relations: ['posts', 'comments'],
                    where: { deletedAt: null },
                },
            );
    }

    public async getUserByPhone(phone: string): Promise<IUser | undefined> {
        return getManager()
            .getRepository(User)
            .findOne(
                { phone },
                {
                    relations: ['posts', 'comments'],
                    where: { deletedAt: null },
                },
            );
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager()
            .getRepository(User)
            .find({ relations: ['posts', 'comments'] });
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager()
            .getRepository(User)
            .findOne({ id }, { relations: ['posts', 'comments'] });
    }

    public async deleteById(id: number): Promise<object> {
        return getManager()
            .getRepository(User)
            .softDelete(id);
    }

    public async updateById(id: number, user: Partial<IUser>): Promise<object> {
        return getManager()
            .getRepository(User)
            .update({ id }, user);
    }

    public async getNewUsers(): Promise<IUser[]> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', {
                date: dayjs()
                    .utc()
                    .startOf('day')
                    .format(),
            })
            .getMany();
    }

    public async getUserPagination(searchObject: Partial<IUser> = {}, limit: number = 20, page: number = 1): Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);

        const [users, itemCount] = await getManager()
            .getRepository(User)
            .findAndCount({
                where: searchObject,
                skip,
                take: limit,
            });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}

export const userRepositories = new UserRepository();
