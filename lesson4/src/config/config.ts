import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    SECRET_ACCESS_KEY: process.env.secret_access_key,
    SECRET_REFRESH_KEY: process.env.secret_refrech_key,
};
