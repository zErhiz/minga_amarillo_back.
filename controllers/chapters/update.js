import Chapter from "../../models/Chapter.js";

let up_date = async(req,res,next)=>{
    try {
        let update = await Chapter.findOneAndUpdate(
            {_id: req.params.id}, // objeto de busqueda de lo que quiero modificar
            req.body, // puedo modificar todas las propiedades que me envia el cliente (objeto con las modificaciones)
            {new: true} //me devuelve el objeto modificado
        )
        
        if(update){
            return res.status(200).json({
                succes: true,
                update,
                message: "the chapter was removed"
                
            })
        }
    } catch (error) {
        next(error)
    }
}

export default up_date