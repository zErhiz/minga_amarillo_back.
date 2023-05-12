import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import passport from '../middlewares-M04/passport.js';
import get_chapters from '../controllers/chapters/get_chapters.js';
import isActive from '../middlewares-02/is_active.js'
import get_one from '../controllers/chapters/get_one.js';
import coverPhoto from "../middlewares-M04/add_cover_photo.js"
import is_property from "../middlewares-01/is_property_of.js"
import next_order from '../middlewares-01/next_order.js';
import exist_order from "../middlewares-02/exist_order.js"

let router = Router()

router.get('/',get_chapters)
router.get('/', read);

router.get('/:id', get_one);



router.post('/',passport.authenticate('jwt',{session:false}),validator(chapterCreate),validator(chapterCreate),next_order,coverPhoto,isActive,is_property,exist_order, create)

  
export default router

 

