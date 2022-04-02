import { sendMessageForAllUsers } from './sendMessageForAllUsers';

export const cronRunner = async () => {
    await sendMessageForAllUsers();
};
