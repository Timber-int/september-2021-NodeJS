import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const studentBodyValidator = Joi.object({
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
        .min(6)
        .max(20)
        .messages({
            'number.min': 'The year cannot be less than 6',
            'number.max': 'The year cannot be more than 20',
        }),
    classNumber: Joi.number()
        .min(1)
        .max(12)
        .required(),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    teacherId: Joi.string()
        .required(),
});

export const studentUpdateValidator = Joi.object({
    classNumber: Joi.number()
        .min(1)
        .max(12)
        .required(),

});
