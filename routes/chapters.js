import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import passport from '../middlewares-M04/passport.js';
import get_chapters from '../controllers/chapters/get_chapters.js';

import get_one from '../controllers/chapters/get_one.js';
import coverPhoto from "../middlewares-M04/add_cover_photo.js"
import finds_id from "../middlewares-01/finds_id.js"
import next_order from '../middlewares-01/next_order.js';
import up_date from '../controllers/chapters/update.js';
import destroy from '../controllers/chapters/destroy.js';
import get_me from '../controllers/chapters/get_me.js';


let router = Router()

router.get('/',get_chapters)
router.get('/', read);
router.get('/:id' ,get_one);


// ,passport.authenticate('jwt',{session:false})
// ,passport.authenticate('jwt',{session:false}) ,finds_id
router.put('/:id', up_date )
router.delete('/:id', destroy )
router.get('/me', get_me);


router.post('/',passport.authenticate('jwt',{session:false}),validator(chapterCreate),next_order,coverPhoto, create)

  
export default router

 

