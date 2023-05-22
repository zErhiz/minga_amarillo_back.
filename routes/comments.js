import  { Router }  from 'express';
import create from '../controllers/comments/create.js';
import update from '../controllers/comments/update.js';

import passport from 'passport';
import all_from_chapters from '../controllers/comments/all_from_chapters.js';
import destroy from '../controllers/comments/destroy.js'

import isProperty from '../middlewares-01/isProperty.js'
let router=Router()

router.post('/', passport.authenticate('jwt',{session:false}),create)//crear comentarios
router.get('/', passport.authenticate('jwt',{session:false}), all_from_chapters)// obtener los comentarios de los capitulos
router.put('/:id', passport.authenticate('jwt',{session:false}),isProperty ,update)// actualizar los comentarios
router.delete('/:id', passport.authenticate('jwt',{session:false}),isProperty, destroy)//eliminar MIS comentarios

export default router