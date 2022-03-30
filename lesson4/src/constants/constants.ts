export const COOKIE = {
    nameRefreshToken: 'refreshToken',
    maxAgeRefreshToken: 1 * 24 * 60 * 60 * 1000,
};

export const TokenType = {
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    ACTION: 'ACTION',
};

export const CONSTANTS = {
    AUTHORIZATION: 'Authorization',
    DATA_BASE: 'okten',
    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    PHONE_REGEXP: new RegExp('(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:(\\s*([2-9]1[02-9]|[2-9][02-8]1|'
        + '[2-9][02-8][02-9]‌​)\\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)'
        + '([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})\\s*(?:\\s*(?:#|x\\.?|ext\\'
        + '.?|extension)\\s*(\\d+)\\s*)?$'),

    WAR_SHIP_URL: 'https://i1.sndcdn.com/artworks-XLKV4GNJc61aNMTR-AjNydQ-t500x500.jpg',
};
