import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import passport from '../middlewares-M04/passport.js';

import get_one from '../controllers/chapters/get_one.js';
import coverPhoto from "../middlewares-M04/add_cover_photo.js"

import next_order from '../middlewares-01/next_order.js';


let router = Router()

router.get('/', read);
router.get('/:id', get_one);



router.post('/',passport.authenticate('jwt',{session:false}),validator(chapterCreate),validator(chapterCreate),next_order,coverPhoto, create)

  
export default router

 

