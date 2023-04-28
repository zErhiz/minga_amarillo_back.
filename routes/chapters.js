import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares/validator.js"
import chapterCreate from "../schemas/chapters.js"

let router = Router()

router.get('/', read);
router.post('/',validator(chapterCreate) ,create)
  
export default router