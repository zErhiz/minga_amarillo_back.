import Joi from "joi";

let mangaCreate=Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.string().required()
  })
  export default mangaCreate