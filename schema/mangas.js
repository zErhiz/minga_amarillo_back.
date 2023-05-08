import Joi from "joi";

let mangaCreate=Joi.object({
  title: Joi.string().required().min(4).max(30).message({
    "string.min": "the title must be at least 4 characteres",
    "string.max": "the title must not have more than 30 characters",
    "string.required": "the title is required"
}),
description: Joi.string().required().min(10).message({
  "any.required": "Description is a required field.",
  "string.empty": "Description cannot  be an empty field and need 10 leters."
}),
    category_id: Joi.string().required()
  })
  export default mangaCreate