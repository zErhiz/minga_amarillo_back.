import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import accountExistsSignUp from '../middlewares-M04/accontSingup.js';

let router = Router()

router.get('/', read);
router.post('/',validator(chapterCreate), accountExistsSignUp ,create)
  
export default router