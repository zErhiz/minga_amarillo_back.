import express from  'express'
//var express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/admins',(req,res,next) => res.status(200).json(
  {
 succes : true,
 admins : []
  }))
export default router;
