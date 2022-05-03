import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const userBodyForRegistrationValidator = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .messages({
            'string.empty': '"firstName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .messages({
            'string.empty': '"lastName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    age: Joi.number()
        .min(12)
        .max(120)
        .messages({
            'number.min': 'The year cannot be less than 12',
            'number.max': 'The year cannot be more than 120',
        }),
    phone: Joi.string()
        .required()
        // .regex(CONSTANTS.PHONE_REGEXP)
        .messages({
            'string.pattern.base': 'Phone not valid',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),

});

export const loginDataValidator = Joi.object({
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});

export const forgotPasswordValidator = Joi.object({
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
});

export const setForgotPasswordValidator = Joi.object({
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});

export const userDataForUpdateValidator = Joi.object({
    phone: Joi.string()
        .required()
        .regex(CONSTANTS.PHONE_REGEXP)
        .messages({
            'string.pattern.base': 'Phone not valid',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});
