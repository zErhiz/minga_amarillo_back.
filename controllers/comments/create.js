import Comment from '../../models/Comment.js'
import User from '../../models/User.js'
import  jwt  from 'jsonwebtoken'
let create =  async(req, res, next)=>{
    try {
      
           req.body.user_id=req.user._id
console.log(req.body)
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