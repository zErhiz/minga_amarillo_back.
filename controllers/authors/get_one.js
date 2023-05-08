import Author from "../../models/Author.js";



let get_one = async(req,res,next)=>{
   try {
    let {id} = req.params
     let all = await  Author.findById(id,'name last_name city country photo date -_id')
     return res.status(200).json({
        succes: true,
        response:all,
     })
   } catch (error) {
    next(error)
   }
}
export default get_one