import cron from 'node-cron';
import { EmailActionEnum } from '../EmailInformation';
import { userRepositories } from '../repositories';
import { emailService } from '../services';

export const sendMessageForAllUsers = async () => {
    try {
        cron.schedule('0 22 * * 1-5', async () => {
            const users = await userRepositories.getAllUsers();

            users.forEach((user) => {
                emailService.sendMail(user.email, EmailActionEnum.SEND_SURPRISE_MESSAGE, {
                    firstName: user.firstName,
                    lastName: user.lastName,
                });
            });
        });
    } catch (e) {
        console.log(e);
    }
};
