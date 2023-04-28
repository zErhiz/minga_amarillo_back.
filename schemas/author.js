import Joi from "joi-oid"; //validador

let authorSchema = Joi.object(
    {
        name: Joi.string().required(),
        last_name:Joi.string().required(),
        city:Joi.string().required(),
        country:Joi.string().required(),
        date: Joi.date(), //si no aclaro que es requerido es false por defecto
        photo:Joi.string().required(), 
        active:Joi.boolean().required(),
        user_id: Joi.object().required(),
       },
    
)
export default authorSchema