import Joi from "joi";

const chapterCreate = Joi.object({

    title: Joi.string().required(),
    pages: Joi.array().items(Joi.string()).required(),
    order: Joi.string().required(),
})

export default chapterCreate