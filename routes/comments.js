import  { Router }  from 'express';
import create from '../controllers/comments/create.js';
import update from '../controllers/comments/update.js';

import passport from 'passport';
import all_from_chapters from '../controllers/comments/all_from_chapters.js';
import destroy from '../controllers/comments/destroy.js'


import isProperty from '../middlewares-01/isProperty.js'
let router=Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         chapter_id:
 *           type: string
 *           description: The ID of the chapter associated with the comment
 *         user_id:
 *           type: string
 *           description: The ID of the user who made the comment
 *         comment:
 *           type: string
 *           description: The content of the comment
 *       required:
 *         - chapter_id
 *         - user_id
 *         - comment
 *       example:
 *         chapter_id: "6466915469460f703373bb12"
 *         user_id: "6466a2fedd2770868f1e0cdd"
 *         comment: "good chapter"
 */
/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapter_id:
 *                 type: string
 *                 description: The ID of the chapter associated with the comment
 *               comment:
 *                 type: string
 *                 description: The content of the comment
 *             required:
 *               - chapter_id  
 *               - comment
 *           example:
 *             chapter_id: "6466915469460f703373bb12"
 *             comment: "that was a good chapter"  
 *     responses:
 *       200:
 *         description: Comment posted successfully
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
 *                     chapter_id:
 *                       type: string
 *                     comment:
 *                       type: string
 *                     user_id:
 *                       type: string
 *             example:
 *               success: true
 *               message: Comment posted successfully
 *               data:
 *                 chapter_id: "6466915469460f703373bb12"
 *                 comment: "that was a good chapter"
 *                 user_id: "6466915069460f703373ba89"
 *       401:
 *         description: Unauthorized to upload a comment
 */
router.post('/', passport.authenticate('jwt',{session:false}),create)//crear comentarios

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments from the ID of a specific chapter
 *     tags: [Comment]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: query
 *         name: comment
 *         schema:
 *           type: string
 *         description: Search for comments containing the specified text (case-insensitive)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Sort comments by creation date (asc or desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of comments per page
 *       - in: query
 *         name: chapter_id
 *         schema:
 *           type: string
 *         description: Filter comments by the ID of the associated chapter
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       chapter_id:
 *                         type: string
 *                       comment:
 *                         type: string
 *                       user_id:
 *                         type: string
 *             example:
 *               success: true
 *               data: []
 *       400:
 *         description: Error occurred while fetching comments
 *       401:
 *         description: Error - You must be logged in
 */


router.get('/', all_from_chapters)// obtener los comentarios de los capitulos

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comment]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The new comment
 *             required:
 *               - comment
 *             example:
 *               comment: good chapter
 *     responses:
 *       200:
 *         description: Comment updated successfully
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
 *                     comment_id:
 *                       type: string
 *                     comment:
 *                       type: string
 *             example:
 *               success: true
 *               message: Comment updated successfully
 *               data:
 *                 comment_id: "123456789"
 *                 comment: "This is the updated comment"
 *       400:
 *         description: Error occurred while updating the comment
 */

router.put('/:id', passport.authenticate('jwt',{session:false}),isProperty ,update)// actualizar los comentarios

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comment]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: Comment deleted successfully
 *       404:
 *         description: Comment not found or already deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: Comment not found or already deleted
 */
router.delete('/:id', passport.authenticate('jwt',{session:false}),isProperty, destroy)//eliminar MIS comentarios


export default router