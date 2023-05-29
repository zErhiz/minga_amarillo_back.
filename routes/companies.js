import  { Router }  from 'express';
import read from '../controllers/companies/read.js'
import passport from '../middlewares-M04/passport.js';
import companyCreate from "../schemas/companies.js"
import create from '../controllers/companies/create.js';
import validator from '../middlewares-M04/validator.js';
import admin from '../controllers/companies/admin.js';
let router = Router()

/**
 * @swagger
 *  components:
 *    schemas:
 *      Company:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: the name of the company
 *          logo:
 *            type: string
 *            description: the logo of the company (must be a URL)
 *          website:
 *            type: string
 *            description: the website of the company (must be a URL)
 *          description:
 *            type: string
 *            description: the description of the company
 *          active:
 *            type: boolean
 *            description: indicates if the company is active to publish mangas
 *          user_id:
 *            type: number
 *            description: the ID of the user who owns this company
 *        required:
 *          - name
 *          - logo
 *          - website
 *          - description
 *        example:
 *          name: Tesla
 *          logo: urlofthelogo
 *          website: tesla.com
 *          description: Hello, this is Tesla company
 */

/**
 * @swagger
 * /api/companies:
 *  get:
 *    summary: Get companies endpoint
 *    tags: [Company]
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: Returns the index page in the back with information about the companies endpoint 
 *        content:
 *          text/html:
 *            schema:
 *              type: string
 *      401:
 *        description: Unauthorized, you must be logged 
 */

router.get('/', passport.authenticate('jwt',{session:false}),read);
/**
 * @swagger
 * /api/companies/admin:
 *   get:
 *     summary: Get all companies for admin
 *     tags: [Company]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Returns a list of inactive or active companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeCompany:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *                 inactiveCompany:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *               example:
 *                 activeCompany:
 *                   - _id: "6466915069460f703373baa2"
 *                     name: "Peace"
 *                     logo: "https://i.postimg.cc/kgQgTVVw/W4-Wjxsq-ZW-1300x655-1.jpg"
 *                     website: "https://purpleteam-minga.com"
 *                     description: "The founding members are Luciana Rovere, Camilo Sanchez and Gustavo Espinosa. Later, Patricio Gimenez joined the team."
 *                     active: true
 *                     user_id: "6466915069460f703373ba8f"
 *                     createdAt: "2023-05-18T20:57:52.813Z"
 *                     updatedAt: "2023-05-24T01:06:26.775Z"
 *                     __v: 0
 *                   - _id: "6466915069460f703373baa5"
 *                     name: "Digital"
 *                     logo: "https://i.postimg.cc/CxqqSLRf/Empresa-digital-jpg-width-600-name-Empresa-digital.jpg"
 *                     website: "https://blueteam-minga.com"
 *                     description: "The founding members are Candela Cañete, Alejandro Dacunto, Valentín Caceres, Cristian Elfante y Pablo Muñiz."
 *                     active: true
 *                     user_id: "6466915069460f703373ba90"
 *                     createdAt: "2023-05-18T20:57:52.913Z"
 *                     updatedAt: "2023-05-19T14:24:52.507Z"
 *                     __v: 0
 *                 inactiveCompany: []
 *       401:
 *         description: Unauthorized, you must be logged in
 *       404:
 *         description: No companies found
 */

router.get('/admin',passport.authenticate('jwt',{session:false}),admin)
/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company (must be logged with a user that is not an author or a company)
 *     tags: [Company]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: New company created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     logo:
 *                       type: string
 *                     website:
 *                       type: string
 *                     description:
 *                       type: string
 *                     active:
 *                       type: boolean
 *                     user_id:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     __v:
 *                       type: number
 *               example:
 *                 success: true
 *                 message: New company created successfully
 *                 data:
 *                   _id: "6466915069460f703373baa2"
 *                   name: "Peace"
 *                   logo: "https://i.postimg.cc/kgQgTVVw/W4-Wjxsq-ZW-1300x655-1.jpg"
 *                   website: "https://purpleteam-minga.com"
 *                   description: "The founding members are Luciana Rovere, Camilo Sanchez and Gustavo Es..."
 *                   active: true
 *                   user_id: "6466915069460f703373ba8f"
 *                   createdAt: "2023-05-18T20:57:52.813+00:00"
 *                   updatedAt: "2023-05-24T01:06:26.775+00:00"
 *                   __v: 0
 *       400:
 *         description: Error creating a company
 *       401:
 *         description: Unauthorized, you must be logged in
 */
router.post('/',passport.authenticate('jwt',{session:false}), validator(companyCreate), create)  
export default router

// 