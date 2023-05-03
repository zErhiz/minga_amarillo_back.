
import express from "express";
import userRouter from "./auth.js";
import authorRouter from "./authors.js";
import categoryRouter from "./categories.js";
import CompaniesRouter from "./companies.js";
import ChapterRouter from "./chapters.js";
import MangasRouter from "./mangas.js";

//var express = require('express');
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "MINGA API", subtitle: "endpoints of minga" });
});
router.use("/auth", userRouter);
router.use("/authors", authorRouter);
router.use("/categories", categoryRouter);
router.use("/companies", CompaniesRouter);
router.use("/chapters", ChapterRouter);
router.use("/mangas", MangasRouter);
export default router;
