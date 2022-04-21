import cron from 'node-cron';
import { userRepositories } from '../repositories';

export const getNewUsers = async () => {
    cron.schedule('0 22 * * 1-5', async () => {
        const newUsers = await userRepositories.getNewUsers();
        console.log(newUsers);
    });
};
