import Joi from "joi";

let mangaUpdate=Joi.object({

  title: Joi.string().min(4).max(30).optional().message({

    "string.min": "the title must be at least 4 characteres",
    "string.max": "the title must not have more than 30 characters",
    "string.required": "the title is required"
}),

description: Joi.string().optional().min(10).message({
  "any.required": "Description is a required field.",
  "string.empty": "Description cannot  be an empty field and need 10 leters."
}),cover_photo:Joi.string().optional().uri().message({

    "string.uri":"invalid_url"
}),
  category_id: Joi.any().optional()
  
})
  export default mangaUpdate