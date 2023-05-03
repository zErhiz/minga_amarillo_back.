import Joi from "joi";

const chapterCreate = Joi.object({

    title: Joi.string().required().min(4).max(30).message({
        "string.min": "the title must be at least 4 characteres",
        "string.max": "the title must not have more than 30 characters",
        "string.required": "the title is required"
    }),
    pages: Joi.array().items(Joi.string()).required().min(1).messages({
       
        'string.empty': 'the pages cannot be empty'
    }),
    order: Joi.number().required(),
})

export default chapterCreate