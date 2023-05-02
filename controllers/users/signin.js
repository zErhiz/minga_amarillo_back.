import User from '../../models/User.js'
import  jwt  from 'jsonwebtoken'
let signin = async(req, res, next)=>{
  try{
    
  await User.findOneAndUpdate(
    {email:req.body.email}, 
    {is_online:true},
    
   )
   const token = jwt.sign(
    {id:req.user._id},
    process.env.TOKEN,
    {expiresIn:60*60*24}
   )
   const user = {
    email:req.user.email,
    photo:req.user.photo,
    role:req.user.role
  } 
   user.password = null
   return res.status(200).json({
    success:true,
    message:'user signed in!',
    token,
    user

   })
  }catch(error){
    next(error)
  }
}
export default signin