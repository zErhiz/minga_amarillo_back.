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

let router = Router()


router.get('/', get_mangas);

router.get('/:id',getOne)
router.get('/author/:author_id', passport.authenticate('jwt',{session:false}),getMangas);


router.post('/',passport.authenticate('jwt',{session:false}),validator(mangaCreate),isActive,existtitle,addcover_photo, create)
export default router