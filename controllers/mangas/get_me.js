 import Manga from "../../models/Manga.js"; 

let getMe=async(req,res,next)=>{
    try {
    
        const mangas = await Manga.find( { author_id:req.body.author_id })
        console.log(mangas);
        if (mangas) {
            return res.status(200).json({
            response:mangas
        })
            
        }return res.status(404).json({
            response:'el manga no esta '
        })

    } catch (error) {
   console.log(error);
    }
}
export default getMe 