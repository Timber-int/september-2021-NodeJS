import Joi from 'joi';

export const checkIsCommentBodyValidator = Joi.object({
    text: Joi.string()
        .alphanum()
        .min(1)
        .max(1000)
        .trim()
        .required()
        .messages({
            'string.empty': '"text" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000',
        }),
    authorId: Joi.number()
        .required()
        .messages({
            'number.empty': '"authorId" Can not be empty',
        }),
    postId: Joi.number()
        .required()
        .messages({
            'number.empty': '"postId" Can not be empty',
        }),
});
