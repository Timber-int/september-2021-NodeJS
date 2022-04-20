import Joi from 'joi';

export const teacherBodyValidator = Joi.object({
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
        .min(21)
        .max(120)
        .messages({
            'number.min': 'The year cannot be less than 21',
            'number.max': 'The year cannot be more than 120',
        }),
    classNumber: Joi.number()
        .min(1)
        .max(12)
        .required(),
});
