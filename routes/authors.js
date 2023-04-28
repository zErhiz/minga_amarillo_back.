//definir endpoints de autores y exportar para utilizarlos en el enrrutador principal
import  { Router }  from 'express';
import read from '../controllers/authors/read.js'
import controller from '../controllers/authors/create.js'
import authorSchema from '../schemas/author.js'
import validator from '../middlewares/validator.js'
import accountExistsSignUp from '../middlewares/accountSignUp.js';

const create = controller.create
let router = Router()


/* router.post('/',(req,res,next)=> res.status(200).send('autor creado')) */
router.get('/',read)
router.post('/',validator(authorSchema),accountExistsSignUp,create)
/* router.put('/:id',(req,res,next)=> res.status(200).send('autor modificado')) */
/* router.delete('/:id',(req,res,next)=> res.status(200).send('autor eliminado')) */
export default router