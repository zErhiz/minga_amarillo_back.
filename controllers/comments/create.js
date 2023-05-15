import Comment from '../../models/Comment.js'
import  jwt  from 'jsonwebtoken'
let create =  async(req, res, next)=>{
    try {
        const token = jwt.sign(
            {id:req.user.id},
            process.env.TOKEN,
            {expiresIn:60*60*24}
           )
           const user = {
            email:req.user.email,
            photo:req.user.photo,
            role:req.user.role
          } 
        req.body.comment
        await Comment.create(req.body)
        return res.status(200).json({
            success: true,
            message: 'Comment posted succesfully',
            data: req.body
        })
    } catch (error) {
        next(error)
    }
} 
export default create