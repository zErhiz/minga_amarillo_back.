import Comment from "../../models/Comment.js";
const update = async(req,res, next)=>{
    try {
         let update= await Comment.updateOne(
            
            {_id:req.params.id},//objeto de busqueda e lo que se quiere modificar 
            req.body, //objeto de la modificacion 
            {new:true}
        )
   return res.status(200).json({
    success:true,
    message:'Updated comment',
    update 
   })
    } catch (error) {
        next(error)
    }
}
export default update