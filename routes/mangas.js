import  { Router }  from 'express';
import get_mangas from '../controllers/mangas/get_mangas.js'
import create from '../controllers/mangas/create.js';
import mangaCreate from '../schema/mangas.js'
import validator from '../middelwares-m-03/validator.js';
import passport from '../middelwares-m-03/passport.js';



import getMangas from '../controllers/mangas/get_mangas_from_autor.js';



let router = Router()


router.get('/', get_mangas);
router.get('/:manga_id',one )


router.get('/author/:author_id', getMangas);


router.post('/',passport.authenticate('jwt',{session:false}),validator(mangaCreate), create)
export default router