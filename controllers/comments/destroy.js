import Comment from "../../models/Comment.js";
let destroy = async(req, res, next)=>{
    try {
        let destroyed = await Comment.deleteOne({_id:req.params.id}) 
        if(destroyed){
            return res.status(200).json({
                success:true,
                destroyed
            })

        }else{
            return res.status(404).json({
                success:false,
                message:'comment already deleted'
            })
        }
    } catch (error) {
        next(error)
    }
}
export default destroy