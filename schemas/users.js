import joi from 'joi'
//const userGet;
//const userUpdate;
//const userDelete;

 export const userCreateSignUp= joi.object({
  
    email:joi.string().email({minDomainSegments:2}).required() ,
    password:joi.string().min(8).max(25).required(),
    photo:joi.string()
});
export const userCreateSignIn= joi.object({
    email:joi.string().email({minDomainSegments:2}).required() ,
    password:joi.string().min(8).max(25).required(),
    
} );
