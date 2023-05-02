import User from '../../models/User.js'
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'

let signup = async (req, res, next)=>{
    req.body.is_online=false
    req.body.role= 0
    req.body.is_verified=false
    req.body.verify_code= crypto.randomBytes(10).toString('hex')
    req.body.password=bcryptjs.hashSync(req.body.password, 10)
    try{
        
        await User.create(req.body)
        return res.status(201).send('user registered')
    }catch(error){
        next(error)
    }
}
export default signup