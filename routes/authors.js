//definir endpoints de autores y exportar para utilizarlos en el enrrutador principal
import  { Router }  from 'express';
import read from '../controllers/authors/read.js'
let router = Router()


/* router.post('/',(req,res,next)=> res.status(200).send('autor creado')) */
router.get('/',read)
/* router.put('/:id',(req,res,next)=> res.status(200).send('autor modificado')) */
/* router.delete('/:id',(req,res,next)=> res.status(200).send('autor eliminado')) */
export default router