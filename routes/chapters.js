import  { Router }  from 'express';
import read from '../controllers/chapters/read.js'
import create from '../controllers/chapters/create.js';
import validator from "../middlewares-M04/validator.js"
import chapterCreate from "../schemas/chapters.js"
import passport from '../middlewares-M04/passport.js';
import get_chapters from '../controllers/chapters/get_chapters.js';

import editChapter from '../schemas/editChapter.js'
import get_one from '../controllers/chapters/get_one.js';
import coverPhoto from "../middlewares-M04/add_cover_photo.js"
import finds_id from "../middlewares-01/finds_id.js"
import next_order from '../middlewares-01/next_order.js';
import up_date from '../controllers/chapters/update.js';
import destroy from '../controllers/chapters/destroy.js';
import get_me from '../controllers/chapters/get_me.js';
import is_property_of from '../middlewares-01/is_property_of.js';
import is_active from '../middlewares-02/is_active.js';
import exist_order from "../middlewares-02/exist_order.js"


let router = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Chapter:
 *       type: object
 *       properties:
 *         manga_id:
 *           type: string
 *           description: ID of the manga the chapter belongs to
 *         title:
 *           type: string
 *           description: Title of the chapter
 *         cover_photo:
 *           type: string
 *           description: Cover photo of the chapter
 *         pages:
 *           type: array
 *           description: List of pages in the chapter
 *           items:
 *             type: string
 *         order:
 *           type: number
 *           description: Order of the chapter
 *       required:
 *         - manga_id
 *         - title
 *         - cover_photo
 *         - pages
 *         - order
 *       example:
 *          manga_id: 6466915169460f703373baaa
 *          title: visa 5
 *          cover_photo: https://i.postimg.cc/jScjzvjQ/alice-in-borderland-002-01.jpg
 *          pages: Array
 *          order: 2
 * 
 */

/**
 * @swagger
 * /api/chapters:
 *   get:
 *     summary: Get chapters
 *     tags: [Chapter]
 *     parameters:
 *       - in: query
 *         name: manga_id
 *         schema:
 *           type: string
 *         description: ID of the manga to filter chapters by
 *       - in: query
 *         name: pages
 *         schema:
 *           type: string
 *         description: Pages of the chapters to filter by
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of chapters per page for pagination
 *     responses:
 *       200:
 *         description: Successful retrieval of chapters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the retrieval was successful
 *                 response:
 *                   type: array
 *                   description: List of chapters
 *                   items:
 *                     $ref: '#/components/schemas/Chapter'
 *                 count:
 *                   type: number
 *                   description: Total number of chapters
 *                 cantPages:
 *                   type: number
 *                   description: Total number of pages for pagination
 *       400:
 *         description: Bad request or an error occurred
 * 
 */

router.get('/',get_chapters)

router.get('/', read);
/**
 * @swagger
 * /api/chapters/me:
 *   get:
 *     summary: Get chapters of the author by manga ID and this has a middleware that you can only acces that manga id with the same id of the author who published it
 *     tags: [Chapter]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: query
 *         name: manga_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga
 *     responses:
 *       200:
 *         description: Successful retrieval of chapters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chapter:
 *                   type: array
 *                   description: List of chapters
 *                   items:
 *                     $ref: '#/components/schemas/Chapter'
 *       404:
 *         description: Chapters not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Route not found
 *       401:
 *        description: User not authorized to access
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the user is not logged in
 *                message:
 *                  type: string
 *                  description: Error message
 *              example:
 *                success: false
 *                message: User not authorized
 *       400:
 *        description: User is not the same author that publish this manga
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the user is not the same author that publis this manga
 *                message:
 *                  type: string
 *                  description: Error message
 *              example:
 *                success: false
 *                message: User not authorized
 * 
 */
router.get('/me',passport.authenticate('jwt',{session:false}) ,finds_id,  get_me);

/**
 * @swagger
 * /api/chapters/{id}:
 *   get:
 *     summary: Get chapter by ID
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chapter
 *     responses:
 *       200:
 *         description: Successful retrieval of chapter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succes:
 *                   type: boolean
 *                   description: Indicates if the retrieval was successful
 *                 all:
 *                   $ref: '#/components/schemas/Chapter'
 *                 next:
 *                   type: string
 *                   description: ID of the next chapter
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Error message
 *                   example: The chapter was not found
 */
router.get('/:id' ,get_one);

/**
 * @swagger
 * /api/chapters/{id}:
 *   put:
 *     summary: Update a chapter
 *     tags: [Chapter]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chapter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the chapter
 *               cover_photo:
 *                 type: string
 *                 description: Cover photo of the chapter
 *               pages:
 *                 type: array
 *                 description: List of pages in the chapter
 *                 items:
 *                   type: string
 *               order:
 *                 type: number
 *                 description: Order of the chapter
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                 update:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Title of the chapter
 *                     cover_photo:
 *                       type: string
 *                       description: Cover photo of the chapter
 *                     pages:
 *                       type: array
 *                       description: List of pages in the chapter
 *                       items:
 *                         type: string
 *                     order:
 *                       type: number
 *                       description: Order of the chapter
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *       404:
 *         description: Chapter not found
 */

router.put('/:id',passport.authenticate('jwt',{session:false}) , finds_id, is_property_of,is_active,up_date )

/**
 * @swagger
 * /api/chapters/{id}:
 *   delete:
 *     summary: Delete a chapter
 *     tags: [Chapter]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the chapter to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 destroyed:
 *                   type: object
 *                   description: Information of the deleted chapter
 *                 message:
 *                   type: string
 *                   example: Chapter deleted
 *       401:
 *         description: Unauthorized access. Please provide a valid JWT token.
 *       404:
 *         description: Chapter not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id',passport.authenticate('jwt',{session:false}) ,finds_id, is_property_of,is_active, destroy )

// ,passport.authenticate('jwt',{session:false})
// , validator(editChapter)

/**
 * @swagger
 * /api/chapters:
 *   post:
 *     summary: Create a new chapter (you can only create a new chapter accessing with the manga_id)
 *     tags: [Chapter]
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
 *                 description: Title of the chapter
 *               pages:
 *                 type: array
 *                 description: List of pages in the chapter
 *                 items:
 *                   type: string
 *               order:
 *                 type: number
 *                 description: Order of the chapter
 *               manga_id:
 *                  type: string
 *                  description: id of the manga that you want to create a chapter
 *           required:
 *             - title
 *             - pages
 *             - order
 *           example:
 *             title: soyeltitulo
 *             pages: [pagina1.com]
 *             order: 1
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *       400:
 *         description: Error creating the chapter
 */

router.post('/',passport.authenticate('jwt',{session:false}),validator(chapterCreate),next_order,coverPhoto, create)


  
export default router

 

