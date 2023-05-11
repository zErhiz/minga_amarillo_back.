import Manga from "../../models/Manga.js";

let getOne= async(req,res,next)=>{
try {
      let {id}=req.params  
     
      
let manga = await Manga.findById(id,'-_id -createdAt -updatedAt -company_id  -__v').populate('author_id','name -_id')
                                                                                   .populate('category_id','name -_id')
console.log('----------------------------');                                    
console.log(manga);

return res.status(200).json({succes:true,
    response:manga}) 
    /*  if(!manga){
        return res.status(404).json({s:'no se ha encontrado el manga'})
}  */

} catch (error) {
    next(error)
}

}
export default getOne