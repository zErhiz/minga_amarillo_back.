import Joi from "joi";

let mangaCreate=Joi.object({
    author_id: Joi.string().required(),
    company_id: Joi.string(),
    title: Joi.string().required(),
    cover_photo: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.string().required()
  })
  export default mangaCreate