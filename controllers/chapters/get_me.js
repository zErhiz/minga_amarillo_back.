import { json } from "express"
import Chapter from "../../models/Chapter.js"

let get_me = async(req,res,next) => {
    try {
        // console.log('hola');
        let chapter = await Chapter.find({manga_id : req.query.manga_id})
        if(chapter){

            return res.status(200).json({
                chapter
            })
        } return res.status(404).json({
            message: "ruta no encontrada"
        })
    } catch (error) {
        next(error)
    }
}
export default get_me