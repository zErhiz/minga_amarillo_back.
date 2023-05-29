//definir endpoints de autores y exportar para utilizarlos en el enrrutador principal
import  { Router }  from 'express';
import read from '../controllers/authors/read.js'
import controller from '../controllers/authors/create.js'
import authorSchema from '../schemas/author.js'
import validator from '../middlewares-02/validator.js'
import authorAlreadeExist from '../middlewares-02/authorAlreadeExist.js';
import passport from '../middlewares-02/passport.js';
import get_one from '../controllers/authors/get_one.js';
import admin_active from "../controllers/authors/admin.js"
const create = controller.create
let router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the author
 *         last_name:
 *           type: string
 *           description: The last name of the author
 *         city:
 *           type: string
 *           description: The city where the author resides
 *         country:
 *           type: string
 *           description: The country where the author resides
 *         date:
 *           type: string
 *           format: date
 *           description: The date of birth of the author
 *         photo:
 *           type: string
 *           description: The URL of the author's photo
 *         active:
 *           type: boolean
 *           description: Indicates if the author is active
 *         user_id:
 *           type: string
 *           description: The ID of the associated user
 *       required:
 *         - name
 *         - city
 *         - country
 *         - photo
 *         - active
 *         - user_id
 *       example:
 *         name: zenitsu
 *         last_name: noyaiba
 *         city: Town
 *         country: China
 *         date: 1990-01-01
 *         photo: https://example.com/photo.jpg
 *         active: false
 *         user_id: 1234567892132
 */
/*  router.post('/',(req,res,next)=> res.status(200).send('autor creado'))  */

/**
 * @swagger
 * /api/authors:
 *  get:
 *    summary: Get authors endpoint
 *    tags: [Authors]
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: Returns the index page in the back with information about the authors endpoint 
 *        content:
 *          text/html:
 *            schema:
 *              type: string
 *      401:
 *        description: Unauthorized, you must be logged 
 */

 router.get('/',passport.authenticate('jwt',{session:false}),read)

/**
 * @swagger
 * /api/authors/admin:
 *  get:
 *    summary: Get active and inactive authors
 *    tags: [Authors]
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: Active and inactive authors retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                activeAuthors:
 *                  type: array
 *                  description: List of active authors
 *                  items:
 *                    $ref: '#/components/schemas/Author'
 *                inactiveAuthors:
 *                  type: array
 *                  description: List of inactive authors
 *                  items:
 *                    $ref: '#/components/schemas/Author'
 *            example:
 *              activeAuthors:
 *                   - name: Giyu
 *                     active: true
 *              inactiveAuthors:
 *                  - name: Zenitsu
 *                    active: false
 *      404:
 *        description: No authors found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 *              example:
 *                error: No authors found
 *      401:
 *        description: User not authorized to access admin data
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
 */
 
 router.get('/admin',passport.authenticate('jwt',{session:false}),admin_active)

/**
 * @swagger
 * /api/authors/{id}:
 * paths:
 *   /api/authors/{id}:
 *     get:
 *       summary: Get author by ID
 *       tags: [Authors]
 *       security:
 *         - jwt: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the author
 *       responses:
 *         200:
 *           description: Successful retrieval of author
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Indicates if the retrieval was successful
 *                   response:
 *                     $ref: '#/components/schemas/Author'
 *         404:
 *           description: Author not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Indicates if the retrieval was successful
 *                   message:
 *                     type: string
 *                     description: Error message
 *                     example: Author not found
 *         401:
 *          description: User not authorized to access 
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the user is not logged in
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: false
 *                 message: User not authorized
 */
router.get('/:id',passport.authenticate('jwt',{session:false}),get_one) 

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author (must be logged with a user that is not an author or a company)
 *     tags: [Authors]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the author
 *               last_name:
 *                 type: string
 *                 description: Last name of the author
 *               city:
 *                 type: string
 *                 description: City of the author
 *               country:
 *                 type: string
 *                 description: Country of the author
 *               photo:
 *                 type: string
 *                 description: url of the photo
 *               date:
 *                 type: string
 *                 format: date
 *                 description: the birthday of the author
 *             required:
 *               - name
 *               - city
 *               - country
 *               - photo
 *             example:
 *              name: zenitsu
 *              last_name: noyaiba
 *              city: Town
 *              country: China
 *              date: 1990-01-01
 *              photo: https://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: Author created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the creation was successful
 *                 Response:
 *                   $ref: '#/components/schemas/Author'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


 router.post('/',passport.authenticate('jwt',{session:false}),validator(authorSchema),authorAlreadeExist,create) 
/*  router.put('/:id',(req,res,next)=> res.status(200).send('autor modificado')) 
 router.delete('/:id',(req,res,next)=> res.status(200).send('autor eliminado'))  */
export default router