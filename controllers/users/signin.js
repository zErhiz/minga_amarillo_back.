import User from '../../models/User.js'
let signin = async(req, res, next)=>{
  try{
    
   User.findOneAndUpdate(
    {email:req.body.email}, 
    {is_online:true}
   )
   return res.status(200).json({
    success:true,
    message:'user signed in!'
   })
  }catch(error){
    next(error)
  }
}
export default signin