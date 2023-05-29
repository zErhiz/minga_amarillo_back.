import express from  'express'
import signup from '../controllers/users/signup.js';
//var express = require('express');
const router = express.Router();
import accountSignUp from '../middlewares-01/accountSignUp.js';
import validator from '../middlewares-01/validator.js'
import { userCreateSignUp, userCreateSignIn } from '../schemas/users.js'; 
import signin from '../controllers/users/signin.js';
import accountExistsSignIn from '../middlewares-01/accountExistsSignIn.js';
import isVerified from '../middlewares-01/isVerified.js'
import passwordIsOk from '../middlewares-01/passIsOk.js';
import passport from '../middlewares-01/passport.js';
import signout from '../controllers/users/signout.js';
import updateRole from '../controllers/users/update_role.js'
import updateRoleCompany from "../controllers/users/update_role_company.js"

import isadmin from '../middlewares-02/isadmin.js';

import verify_code from '../controllers/users/veryfyCode.js';

import upload from '../middlewares-01/upload.js';
import uploadImg from '../services/firebase.cjs';




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/admins',(req,res,next) => res.status(200).json(
  {
    succes : true,
    admins : []
  }))


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: the email of the user
 *          password:
 *            type: string
 *            description: the password of the user
 *          photo:
 *            type: string
 *            description: the photo of the user must be a url
 *          role:
 *            type: number
 *            description: the role of the user 
 *          is_online:
 *            type: boolean
 *            description: indicates if the user is online
 *          is_verified:
 *            type: boolean
 *            description: indicates if the user is verified with the verified code
 *          verify_code:
 *            type: string
 *            description: is the verify code for the authentication
 *        required:
 *          - email
 *          - password
 *          - photo
 *          - role
 *          - is_online
 *          - is_verified
 *          - verify_code
 *        example:
 *          email: alejandro@mh.com.ar
 *          password: hola1234
 *          photo: url of the photo
 *          role: 0
 *          is_online: true
 *          is_verified: true
 *          verify_code: soyelcodigo
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Create a new User
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *              password:
 *                type: string
 *                description: Password of the user
 *              photo:
 *                type: string
 *                description: Photo of the user (must be a URL)
 *            required:
 *              - email
 *              - password
 *              - photo
 *            example:
 *              email: soyunusuario@gmail.com
 *              password: hola1234
 *              photo: https://hola.com
 *    responses:
 *      201:
 *        description: New user created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *              example:
 *                message: User registered
 *      400:
 *        description: Error creating a user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 *              example:
 *                error: Error creating a user
 */
 router.post('/signup',upload(),uploadImg,validator(userCreateSignUp), accountSignUp, signup);

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    summary: Sign in a user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *              password:
 *                type: string
 *                description: Password of the user
 *            required:
 *              - email
 *              - password
 *            example:
 *              email: silvina@mh.com.ar
 *              password: hola1234
 *    responses:
 *      200:
 *        description: User signed in successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                token:
 *                  type: string
 *                user:
 *                  $ref: '#/components/schemas/User'
 *      400:
 *        description: Error signing in the user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 *              example:
 *                error: Error signing in the userr
 */



  router.post('/signin', validator(userCreateSignIn), accountExistsSignIn,isVerified,passwordIsOk, signin)
  
  /**
 * @swagger
 * /api/auth/signout:
 *  post:
 *    summary: Sign out a user
 *    tags: [Auth]
 *    security:
 *      - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *            required:
 *              - email
 *            example:
 *              email: soyunusuario@gmail.com
 *    responses:
 *      '200':
 *        description: User signed out successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *      '400':
 *        description: Error signing out the user
 *      '401':
 *        description: Unauthorized - user must be logged in
 */
  router.post('/signout',passport.authenticate('jwt',{session:false}) ,signout) 


/**
 * @swagger
 * /api/auth/role/author/{id}:
 *  put:
 *    summary: Update role and author status
 *    tags: [Auth]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user that wants to be an author
 *        example: 6466915069460f703373ba8d
 *      
 *    responses:
 *      '200':
 *        description: Role and author status updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the update was successful
 *                message:
 *                  type: string
 *                  description: Success message
 *                newAuthor:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    last_name:
 *                      type: string
 *                    city:
 *                      type: string
 *                    country:
 *                      type: string
 *                    photo:
 *                      type: string
 *                    active:
 *                      type: boolean
 *                    user_id:
 *                      type: string
 *                  example:
 *                    _id: "6466915069460f703373ba9f"
 *                    name: "igna"
 *                    last_name: "borraz"
 *                    city: "rosario"
 *                    country: "argentina"
 *                    photo: "https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg"
 *                    active: true
 *                    user_id: "6466915069460f703373ba8d"
 *      '400':
 *        description: User or author not found, or an error occurred in the update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the update was successful
 *                message:
 *                  type: string
 *                  description: Error message
 *              example:
 *                success: false
 *                message: User or author not found
 *      '401':
 *        description: User not authorized to perform the update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the user is not authorized
 *                message:
 *                  type: string
 *                  description: Error message
 *              example:
 *                success: false
 *                message: User not authorized
 */


   router.put('/role/author/:id',passport.authenticate('jwt',{session:false}),isadmin, updateRole) 

/**
 * @swagger
 * /api/auth/role/company/{id}:
 *  put:
 *    summary: Update role and Company status
 *    tags: [Auth]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user that wants to be a Company
 *        example: 6466915069460f703373ba8f
 *      
 *    responses:
 *      '200':
 *        description: Role and Company status updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the update was successful
 *                message:
 *                  type: string
 *                  description: Success message
 *                newCompany:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    logo:
 *                      type: string
 *                    website:
 *                      type: string
 *                    description:
 *                      type: string
 *                    active:
 *                      type: boolean
 *                    user_id:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                    __v:
 *                      type: number
 *                  example:
 *                    _id: "6466915069460f703373baa2"
 *                    name: "Peace"
 *                    logo: "https://i.postimg.cc/kgQgTVVw/W4-Wjxsq-ZW-1300x655-1.jpg"
 *                    website: "https://purpleteam-minga.com"
 *                    description: "The founding members are Luciana Rovere, Camilo Sanchez and Gustavo Espinosa. Later, Patricio Gimenez joined the team."
 *                    active: true
 *                    user_id: "6466915069460f703373ba8f"
 *                    createdAt: "2023-05-18T20:57:52.813Z"
 *                    updatedAt: "2023-05-24T01:06:26.775Z"
 *                    __v: 0
 *      '400':
 *        description: User or Company not found, or an error occurred in the update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the update was successful
 *                message:
 *                  type: string
 *                  description: Error message
 *              example:
 *                success: false
 *                message: User or Company not found
 *      '401':
 *        description: User not authorized to perform the update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates if the user is not authorized
 *                message:
 *                  type: string
 *                  description: Error message
 *              example:
 *                success: false
 *                message: User not authorized
 */



  
 
  router.get('/verify/:verify_code', verify_code)

  router.put('/role/company/:id',passport.authenticate('jwt',{session:false}),isadmin,updateRoleCompany)

  export default router;
