import  { Router }  from 'express';
import create from '../controllers/comments/create.js';
import update from '../controllers/comments/update.js';

import passport from 'passport';
import all_from_chapters from '../controllers/comments/all_from_chapters.js';
import destroy from '../controllers/comments/destroy.js'

let router=Router()

router.post('/', passport.authenticate('jwt',{session:false}),create)
router.get('/', passport.authenticate('jwt',{session:false}), all_from_chapters)
router.put('/:id', passport.authenticate('jwt',{session:false}), update)
router.delete('/:id', passport.authenticate('jwt',{session:false}) , destroy)

export default router