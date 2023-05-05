import  { Router }  from 'express';
import read from '../controllers/companies/read.js'
import passport from '../middlewares-M04/passport.js';
import companyCreate from "../schemas/companies.js"
import create from '../controllers/companies/create.js';
import validator from '../middlewares-M04/validator.js';

let router = Router()

router.get('/', read);

router.post('/',passport.authenticate('jwt',{session:false}), validator(companyCreate), create)  
export default router

// 