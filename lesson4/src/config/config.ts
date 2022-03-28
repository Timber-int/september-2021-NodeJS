import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5500,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'SECRET_REFRESH_KEY',
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS || '1d',
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '1d',

    NO_REPLY_EMAIL: process.env.ROOT_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
};
