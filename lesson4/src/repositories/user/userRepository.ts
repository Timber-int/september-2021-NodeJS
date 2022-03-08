import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUsers, Users } from '../../entity/users';
import { IUserRepository } from './userRepository.interfaces';

@EntityRepository(Users)
class UserRepository extends Repository<Users> implements IUserRepository {
    public async createUser(user:IUsers): Promise<IUsers> {
        return getManager().getRepository(Users).save(user);
    }

    public async getUserByEmail(email: string):Promise<IUsers | undefined > {
        return getManager().getRepository(Users)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
}
export const userRepositories = new UserRepository();
