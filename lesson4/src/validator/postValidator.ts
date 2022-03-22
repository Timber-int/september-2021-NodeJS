import Joi from 'joi';

export const checkIsPostBodyValidate = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(10)
        .max(500)
        .trim()
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 10 max 500',
        }),
    text: Joi.string()
        .alphanum()
        .min(20)
        .max(5000)
        .trim()
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 20 max 5000',
        }),
    userId: Joi.number()
        .required(),
});

export const checkIsPostBodyValidateForUpdate = Joi.object({
    text: Joi.string()
        .alphanum()
        .min(20)
        .max(5000)
        .trim()
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 20 max 5000',
        }),
});
