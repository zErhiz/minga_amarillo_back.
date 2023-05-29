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
import finds_id from '../middlewares-01/finds_id.js'
import getMe from '../controllers/mangas/get_me.js';
import is_active from '../middlewares-02/is_active.js';
import is_property_of from '../middlewares-01/is_property_of.js' 
import update from '../controllers/mangas/update.js';
import destroy from '../controllers/mangas/destroy.js';
import mangaUpdate from '../schema/manga_update.js';
import upload_manga from '../middlewares-01/upload_manga.js'
import uploadImg from '../services/firebase.cjs';
/* import upload from '../middlewares-01/upload.js' */


let router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Mangas:
 *       type: object
 *       properties:
 *         author_id:
 *           type: string
 *           description: The ID of the author associated with the Manga
 *         company_id:
 *           type: string
 *           description: The ID of the company associated with the Mangas
 *         title:
 *           type: string
 *           description: The title of the Manga
 *         cover_photo:
 *           type: string
 *           description: The URL of the cover photo of the Manga
 *         description:
 *           type: string
 *           description: The description of the Manga
 *         category_id:
 *           type: string
 *           description: The ID of the category associated with the Manga
 *       required:
 *         - author_id
 *         - title
 *         - cover_photo
 *         - description
 *         - category_id
 *       example:
 *         author_id: 6466915469460f703373bb12
 *         company_id: 6466a2fedd2770868f1e0cdd
 *         title: shingeki no kojin
 *         cover_photo: https://example.com/book-cover.jpg
 *         description: This is an excellent manga.
 *         category_id: 6466915469460f703373bb13
 */

/**
 * @swagger
 * /api/mangas:
 *   get:
 *     summary: Get a list of mangas
 *     tags: [Manga]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter mangas by title 
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: Filter mangas by category ID
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Sort mangas by title (ascending or descending)
 *     responses:
 *       200:
 *         description: List of mangas retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mangas'
 *       500:
 *         description: Internal server error
 */ 

router.get('/', get_mangas);

/**
 * @swagger
 * /api/mangas/author/{author_id}:
 *   get:
 *     summary: Get mangas by author
 *     tags: [Manga]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: author_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author to retrieve mangas from
 *       - in: query
 *         name: new
 *         schema:
 *           type: boolean
 *         description: Sort mangas by creation date (newest first)
 *     responses:
 *       200:
 *         description: Mangas retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 mangas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mangas'
 *                 contador:
 *                   type: number
 *                   example: 1
 *       404:
 *         description: No mangas found for the specified author
 *       500:
 *         description: Internal server error
 */
router.get('/author/:author_id', passport.authenticate('jwt',{session:false}),getMangas);


/**
 * @swagger
 * /api/mangas/me:
 *   get:
 *     summary: Get mangas by logged-in user
 *     tags: [Manga]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Mangas retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mangas'
 *       404:
 *         description: Mangas not found for the logged-in user
 *       500:
 *         description: Internal server error
 */
router.get('/me', passport.authenticate('jwt',{session:false}),finds_id,getMe)

/**
 * @swagger
 * /api/mangas/{id}:
 *   get:
 *     summary: Get a manga by ID
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga
 *     responses:
 *       200:
 *         description: Manga retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 response:
 *                   $ref: '#/components/schemas/Mangas'
 *       404:
 *         description: Manga not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id',getOne)


/**
 * @swagger
 * /api/mangas/{id}:
 *   put:
 *     summary: Update a manga
 *     tags: [Manga]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the Manga
 *               cover_photo:
 *                 type: string
 *                 description: The URL of the cover photo of the Manga
 *               description:
 *                 type: string
 *                 description: The description of the Manga
 *               category_id:
 *                 type: string
 *                 description: The ID of the category associated with the Manga
 *           required:
 *             - title
 *             - cover_photo
 *             - description
 *             - category_id
 *           example:
 *             title: "Dragon Ball"
 *             cover_photo: "https://i.postimg.cc/PqQHYqrL/main-alice-in-borderland.jpg"
 *             description: "the best anime in the world"
 *             category_id: "6466914e69460f703373ba83"
 *     responses:
 *       200:
 *         description: Manga updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 manga:
 *                   $ref: '#/components/schemas/Mangas'
 *       400:
 *         description: Error occurred while updating the manga
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Manga not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id',passport.authenticate('jwt',{session:false}),validator(mangaUpdate),finds_id,is_active, is_propery_of,update)

/**
 * @swagger
 * /api/mangas/{id}:
 *   delete:
 *     summary: Delete a manga
 *     tags: [Manga]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga to delete
 *     responses:
 *       200:
 *         description: Manga deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Manga not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', passport.authenticate('jwt',{session:false}),finds_id,is_active,is_propery_of,destroy)

/**
 * @swagger
 * /api/mangas:
 *   post:
 *     summary: Create a manga
 *     tags: [Manga]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the Manga
 *               cover_photo:
 *                 type: string
 *                 description: The URL of the cover photo of the Manga
 *               description:
 *                 type: string
 *                 description: The description of the Manga
 *               category_id:
 *                 type: string
 *                 description: The ID of the category associated with the Manga
 *             required:
 *               - title
 *               - cover_photo
 *               - description
 *               - category_id
 *             example:
 *               title: shingeki no kojin
 *               cover_photo: https://example.com/book-cover.jpg
 *               description: This is an excellent manga.
 *               category_id: 6466915469460f703373bb13
 *     responses:
 *       201:
 *         description: Manga created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: The title of the Manga
 *                     cover_photo:
 *                       type: string
 *                       description: The URL of the cover photo of the Manga
 *                     description:
 *                       type: string
 *                       description: The description of the Manga
 *                     category_id:
 *                       type: string
 *                       description: The ID of the category associated with the Manga
 *                 success:
 *                   type: boolean
 *                 timestamps:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Error occurred while creating the manga
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */




router.post('/',upload_manga(),uploadImg,passport.authenticate('jwt',{session:false}),validator(mangaCreate),isActive,create)

export default router