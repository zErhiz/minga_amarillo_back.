import Chapter from '../models/Chapter.js'
import Manga from '../models/Manga.js'


async function next_order(req, res, next){
    console.log('str')
    const manga = req.body
    console.log(manga)
    if(req.body.order){
        return next()
    }
   

    
    if(req.body.order){
        
        const chapter=await Chapter.find().sort({order : '- 1'}).limit(1)

        let nextOrder= chapter[0].order + 1
        req.body.order= nextOrder
        console.log(chapter)

    }
        
       return next()

}
export default next_order