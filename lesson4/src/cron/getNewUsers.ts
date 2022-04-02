import cron from 'node-cron';
import { userRepositories } from '../repositories';

export const getNewUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        const newUsers = await userRepositories.getNewUsers();
        console.log(newUsers);
    });
};
