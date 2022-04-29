export const TokenType = {
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    ACTION: 'ACTION',
};

export const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
    MANAGER: 'manager',
};

export const CONSTANTS = {
    AUTHORIZATION: 'Authorization',
    DATA_BASE: 'okten',

    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AGE_REGEX: new RegExp('^(?:1(?:00?|\\d)|[2-5]\\d|[6-9]\\d?)$'),

    WAR_SHIP_URL: 'https://i1.sndcdn.com/artworks-XLKV4GNJc61aNMTR-AjNydQ-t500x500.jpg',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],

    VIDEO_MIMETYPES: [
        'video/mp4',
        'video/x-msvideo',
    ],
};
