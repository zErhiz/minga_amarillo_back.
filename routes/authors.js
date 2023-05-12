//definir endpoints de autores y exportar para utilizarlos en el enrrutador principal
import  { Router }  from 'express';
import read from '../controllers/authors/read.js'
import controller from '../controllers/authors/create.js'
import authorSchema from '../schemas/author.js'
import validator from '../middlewares-02/validator.js'
import authorAlreadeExist from '../middlewares-02/authorAlreadeExist.js';
import passport from '../middlewares-02/passport.js';
import get_one from '../controllers/authors/get_one.js';
const create = controller.create
let router = Router()


/* router.post('/',(req,res,next)=> res.status(200).send('autor creado')) */
router.get('/',read)
router.get('/:id',passport.authenticate('jwt',{session:false}),get_one)
router.post('/',passport.authenticate('jwt',{session:false}),validator(authorSchema),authorAlreadeExist,create)
/* router.put('/:id',(req,res,next)=> res.status(200).send('autor modificado')) */
/* router.delete('/:id',(req,res,next)=> res.status(200).send('autor eliminado')) */
export default router