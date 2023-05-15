import  { Router }  from 'express';
import create from '../controllers/comments/create.js';


let router=Router()

router.post('/',create)

export default router