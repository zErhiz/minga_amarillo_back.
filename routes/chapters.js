import  { Router }  from 'express';

import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import passport from '../middlewares-M04/passport.js';
import get_chapters from '../controllers/chapters/get_chapters.js';

let router = Router()

router.get('/',get_chapters)
/*  router.get('/',read);   */

router.post('/', passport.authenticate('jwt',{session:false}),validator(chapterCreate), create)
  
export default router

// 

