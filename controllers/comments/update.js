import Comment from "../../models/Comment.js";
const update = async(req,res, next)=>{
    try {
        console.log(req.body)
         let response= await Comment.findOneAndUpdate(
            
            {_id:req.params.id},//objeto de busqueda e lo que se quiere modificar 
            req.body, //objeto de la modificacion 
            {new:true}
        )
        if(response){
            return res.status(200).json({
                succes:true,
                message:'Comment edited'
            })
        }
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