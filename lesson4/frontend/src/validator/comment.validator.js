import Joi from 'joi';

export const checkIsCommentBodyValidator = Joi.object({
    text: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages({
            'string.empty': '"text" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 250',
        }),
});
