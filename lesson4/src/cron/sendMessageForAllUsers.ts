import cron from 'node-cron';
import { EmailActionEnum } from '../EmailInformation';
import { userRepositories } from '../repositories';
import { emailService } from '../services';
import { IUser } from '../entity';

export const sendMessageForAllUsers = async () => {
    try {
        cron.schedule('5 0 * 8 *', async () => {
            const users = await userRepositories.getAllUsers();

            await Promise.all([
                [...users].map(async (user: IUser) => {
                    await emailService.sendMail(user.email, EmailActionEnum.SEND_SURPRISE_MESSAGE, {
                        firstName: user.firstName,
                        lastName: user.lastName,
                    });
                }),
            ])
                .then((value: (Awaited<Promise<void>[]>)[]) => value);
        });
    } catch (e) {
        console.log(e);
    }
};
