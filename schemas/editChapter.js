import Joi from "joi"

const schema = Joi.object({
    title: Joi
        .string()
        .min(1)
        .messages({
            'string.min': 'the title must be at least 1 characteres',
            'string.empty': 'the title cannot be empty',
        }),
    order: Joi
        .any(),
    pages: Joi
        .array().items(Joi.string().uri()),
    cover_photo: Joi
        .string().uri()
        .message({
            'string': 'the cover_photo have to be url',
        }),
        manga_id: Joi
        .string()
        
        })


export default schema