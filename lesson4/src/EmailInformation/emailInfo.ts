import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to September 2021',
        templateName: 'welcome',
    },

    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        templateName: 'Sorry but your account was blocked',
    },
};
