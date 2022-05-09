import Joi from 'joi';

export const checkIsPostBodyValidate = Joi.object({
    title: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 250',
        }),
    text: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages({
            'string.empty': '"text" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 250',
        }),
});
