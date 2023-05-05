import Chapter from '../models/Chapter.js'
import Manga from '../models/Manga.js'


async function next_order(req, res, next){
    if(req.body.order){
        return next()
    }
    const manga = req.body.manga

    
    if(!req.body.order){
        const chapter=await Chapter.findOne({manga_id : manga}).sort({order : '- 1'})
        req.body.order= chapter
        
        
    }
        
       

}
export default next_order