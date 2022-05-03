export const CONSTANTS = {
    LOADING: 'Loading',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',

    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AGE_REGEX: new RegExp('^(?:1(?:00?|\\d)|[2-5]\\d|[6-9]\\d?)$'),
};
