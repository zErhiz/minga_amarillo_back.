import createHttpError from "http-errors";

const notFound =(req,res,next)=>{


    next(createHttpError(`404,la ruta no existe`))

}
export default notFound