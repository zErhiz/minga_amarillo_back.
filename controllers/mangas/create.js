import createHttpError from 'http-errors'
import Manga from "../../models/Manga.js"
/* import crypto from 'crypto' */
/* import bcryptjs from ' bcryptjs ' */

let create = async(req,res,next)=>{

    
    try {  //llamo al modelo manga
    req.body.author_id= '64496465077201479936117f'
    req.body.company_id='64496465077201479936118e'
    req.body.cover_photo="https://i.postimg.cc/ydWYPLCC/ao-haru-ride-752359695-large.jpg"
    console.log(req.body);
       let one=  new Manga(req.body)
       await one.save()
       return res.status(201).json({
       reponse:one,
       success:true,
       timestamps:one.createdAt

       })

    } catch (error) {
        
        next(createHttpError )
    }
}
export default create