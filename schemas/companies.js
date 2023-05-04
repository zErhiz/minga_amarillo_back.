import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required().min(3).max(140).messages({
        "any.required": "Name is a required field.",
        "string.empty": "Name cannot be an empty field."
    }),
    logo: Joi.string().required().messages({
        "any.required": "Logo is a required field.",
        "string.empty": "Logo cannot be an empty field."
    }),
    website: Joi.string().required().messages({
        "any.required": "Website is a required field.",
        "string.empty": "Website cannot be an empty field."
    }),
    description: Joi.string().required().min(10).message({
        "any.required": "Description is a required field.",
        "string.empty": "Description cannot be an empty field."
    })
})

export default schema

// user_id: Joi.string(),
//     active: Joi.boolean(),

