import Manga from "../../models/Manga.js";

let update =async(req,res,next)=>{
    try {
        
        let manga = await Manga.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        return res.status(200).json({
            succes:true,
            manga
        })
        
        
    } catch (error) {
        next(error)
        
    }
}
export default update