import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to September 2021',
        html: 'Hello my friend',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        html: 'Sorry but your account was blocked',
    },
};
