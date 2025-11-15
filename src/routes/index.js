const express = require("express");
const router = express.Router();


const noticias = require("./noticaRoutes");
const artigos = require("./artigosRoutes")
const membros = require("./membrosRoutes");

router.use('/noticias', noticias);
router.use('/artigos', artigos);
router.use('/membros', membros); 

module.exports = router;
