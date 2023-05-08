 import Manga from "../models/Manga.js";


const property =async (req,res,next)=>{
    const mangaId=req.body.manga_id
    const authorId=req.body.author_id
    try{
const manga= await Manga.findOne( {_id:mangaId,author_id:authorId} )
if(!manga){
    return res.status(404).json({message:"Manga not found or not owned by author"})
}
next()
    }
    catch (err){
return res.status(500).json({menssage:"Server error"})
    }
}

export default property
