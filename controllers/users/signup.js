import User from '../../models/User.js'
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
// import transporter from '../../config/verificationMail.js'
import nodemailer from 'nodemailer'




function sendVery(req,res){

    const transporter = nodemailer.createTransport({
        service:"gmail",
         auth: {
             user: process.env.MAILING_EMAIL,
             pass: process.env.MAILING_PASSWORD
         }
     })
    const message ={

        from: process.env.EMAIL_MAILING,
            to: req.body.email,
            subject: "User Validation",
            text: "Click on the link to validate your user  ",
            html: `<p><br>Welcome to Minga  ${req.body.name} <br>
            <br> Discover a manga, have fun and enjoy <br> 
            Press the following link to validate your user: <a href="http://localhost:8000/api/auth/verify/${req.body.verify_code}">Click here</a> 
            <br>
            Kind regards,<br>
            Minga's team<br>
            minga.sprint@gmail.com<br>
            www.minga.com.ar<br>
            <br>
            Thanks for using our app! If you have any questions or suggestions, please do not hesitate to contact us.<br>
            <br>
            Minga Project</p>`
        }
        try {
            // transporter.sendMail(message)
            transporter.sendMail(message, (error, info)=>(error?console.log(error):console.log(info)))
    } catch (error) {
        return res.status(error.code).send({error: "error"})
    }
} 
let signup = async (req, res, next)=>{
    
         
    req.body.name
    req.body.email
    req.body.is_online=false
    req.body.role= 0
    req.body.is_verified=false  
    req.body.verify_code= crypto.randomBytes(10).toString('hex')
    req.body.password=bcryptjs.hashSync(req.body.password, 10)
    
    try{
        
        
        // const message = {
        //     from: process.env.EMAIL_MAILING,
        //     to: req.body.email,
        //     subject: "User Validation",
        //     text: "Click on the link to validate your user  ",
        //     html: `<p><br>Welcome to Minga  ${req.body.name} <br>
        //     <br> Discover a manga, have fun and enjoy <br> 
        //     Press the following link to validate your user: <a href="http://localhost:8000/api/auth/verify/${req.body.verify_code}">Click here</a> 
        //     <br>
        //     Kind regards,<br>
        //     Minga's team<br>
        //     minga.sprint@gmail.com<br>
        //     www.minga.com.ar<br>
        //     <br>
        //     Thanks for using our app! If you have any questions or suggestions, please do not hesitate to contact us.<br>
        //     <br>
        //     Minga Project</p>`
        // }
        await sendVery(req,res)
        await User.create(req.body)
        // console.log(req.body.email);
        
        return res.status(201).json({
            succes: true,
            message: 'user register',
            data: req.body
        })


    }catch(error){
        next(error)
    }
}
export default signup