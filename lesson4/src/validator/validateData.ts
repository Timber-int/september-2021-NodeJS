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
        .regex(CONSTANTS.PHONE_REGEXP),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim(),

});

export const loginDataValidator = Joi.object({
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim(),
});
