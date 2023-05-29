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
  router.post('/signup',upload(),uploadImg,validator(userCreateSignUp), accountSignUp, signup);

  router.post('/signin', validator(userCreateSignIn), accountExistsSignIn,isVerified,passwordIsOk, signin)
  router.post('/signout',passport.authenticate('jwt',{session:false}) ,signout) 
  
  router.put('/role/author/:id',passport.authenticate('jwt',{session:false}),isadmin, updateRole) 
  router.get('/verify/:verify_code', verify_code)
  router.put('/role/company/:id',passport.authenticate('jwt',{session:false}),isadmin,updateRoleCompany)

  export default router;
