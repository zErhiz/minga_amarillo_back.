//me faltan importar el error
import Manga from "../../models/Manga.js"
/* import crypto from 'crypto' */
/* import bcryptjs from ' bcryptjs ' */

let create = async(req,res,next)=>{

    
    try {  //llamo al modelo manga
       let one= await new Manga(req.body)
       return res.status(201).json({
       reponse:one,
       success:true,
       timestamps:one.createdAT

       })

    } catch (error) {
        
        next (error)
        
    }
}
export default create