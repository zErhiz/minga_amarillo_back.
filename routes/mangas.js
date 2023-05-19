import  { Router }  from 'express';
import get_mangas from '../controllers/mangas/get_mangas.js'
import create from '../controllers/mangas/create.js';
import mangaCreate from '../schema/mangas.js'
import validator from '../middelwares-m-03/validator.js';
import passport from '../middelwares-m-03/passport.js';
import getOne from '../controllers/mangas/get_one.js';
import isActive from '../middlewares-02/is_active.js'
import existtitle from "../middlewares-M04/exists_title.js"
import getMangas from '../controllers/mangas/get_mangas_from_autor.js';
import addcover_photo from "../middlewares-M04/add_cover_photo.js"
import finds_id from '../middlewares-01/finds_id.js'
import getMe from '../controllers/mangas/get_me.js';
import is_active from '../middlewares-02/is_active.js';
import is_propery_of from '../middlewares-01/is_property_of.js'
import update from '../controllers/mangas/update.js';
import destroy from '../controllers/mangas/destroy.js';
import mangaUpdate from '../schema/manga_update.js';

let router = Router()


router.get('/', get_mangas);
router.get('/author/:author_id', passport.authenticate('jwt',{session:false}),getMangas);
router.get('/me', passport.authenticate('jwt',{session:false}),finds_id,getMe)
router.get('/:id',getOne)
router.put('/:id',passport.authenticate('jwt',{session:false}),validator(mangaUpdate),finds_id,is_active, is_propery_of,update)
router.delete('/:id', passport.authenticate('jwt',{session:false}),finds_id,is_active,is_propery_of,destroy)

router.post('/',passport.authenticate('jwt',{session:false}),validator(mangaCreate),isActive,existtitle,addcover_photo, is_propery_of  ,create)
export default router