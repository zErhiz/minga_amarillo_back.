import createHttpError from 'http-errors'
import Manga from "../../models/Manga.js"
/* import crypto from 'crypto' */
//datos ramdoms
/* import bcryptjs from ' bcryptjs ' */
//datos encriptados

let create = async(req,res,next)=>{

    
    try {  //llamo al modelo manga
    req.body.author_id= '64496465077201479936117f'
    req.body.company_id='64496465077201479936118e'

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