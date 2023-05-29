import { Router } from 'express';
import read from '../controllers/categories/read.js';

let router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of the category
 *         color:
 *           type: string
 *           description: color of the category
 *         hover:
 *           type: string
 *           description: hover color of the category
 *         description:
 *           type: string
 *           description: description of the category
 *         cover_photo:
 *           type: string
 *           description: photo of the category
 *         character_photo:
 *           type: string
 *           description: photo of the character of that category
 *       required:
 *         - name
 *         - color
 *         - hover
 *         - description
 *         - cover_photo
 *         - character_photo
 *       example:
 *         name: Shonen
 *         color: '#ffff'
 *         hover: '#0101'
 *         description: the best category
 *         cover_photo: urlofthephoto
 *         character_photo: urlofthecharacter
 */
/**
 * @swagger 
 * /api/categories:
 *  get:
 *      summary: return all categories
 *      tags:
 *        - Categories
 *      responses:
 *          200:    
 *              description: all categories
 *              content:    
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Categories'
 *          400:
 *              description: categories not found or something went wrong
 */
router.get('/', read);

export default router;