import createHttpError from 'http-errors'
import Manga from "../../models/Manga.js"
/* import crypto from 'crypto' */
//datos ramdoms
/* import bcryptjs from ' bcryptjs ' */
//datos encriptados

let create = async(req,res,next)=>{
   console.log( req.file);
   const {firebaseurl}=req.file ? req.file : ""
   req.body.cover_photo = firebaseurl
   try {  //llamo al modelo manga
      const author=req.author
      req.body.author_id =author._id
      console.log(req.body);
       let one=  await  new Manga(req.body)
       .populate('author_id','name ')
      
       await one.save()
       return res.status(201).json({
       response:one,
       success:true,
       timestamps:one.createdAt

       })

    } catch (error) {
        
       return  next(createHttpError(500,err) )
    }
}
export default create