import User from '../../models/User.js'
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'

let signup = async (req, res, next)=>{

    console.log( req.file);
     const {firebaseurl}=req.file ? req.file : ""

    req.body.photo = firebaseurl
    req.body.is_online=false
    req.body.role= 0
    req.body.is_verified=true  
    req.body.verify_code= crypto.randomBytes(10).toString('hex')
    req.body.password=bcryptjs.hashSync(req.body.password, 10)
    try{
        
       let one= await User.create(req.body)
        return res.status(201).json({
            response:one,
            success:'user registered'
        })
    }catch(error){
        next(error)
    }
}
export default signup