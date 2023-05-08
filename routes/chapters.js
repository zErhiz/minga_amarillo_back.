import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import passport from '../middlewares-M04/passport.js';
import next_order from '../middlewares-01/next_order.js';

let router = Router()

router.get('/', read);


router.post('/',validator(chapterCreate),passport.authenticate('jwt',{session:false}),validator(chapterCreate),next_order, create)
  
export default router

 

