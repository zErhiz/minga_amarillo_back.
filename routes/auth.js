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
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/admins',(req,res,next) => res.status(200).json(
  {
 succes : true,
 admins : []
  }))
  router.post('/signup',validator(userCreateSignUp),accountSignUp, signup)
  router.post('/signin', validator(userCreateSignIn), accountExistsSignIn,isVerified,passwordIsOk, signin)
export default router;
