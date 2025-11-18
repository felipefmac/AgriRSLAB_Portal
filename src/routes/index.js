const express = require("express");
const router = express.Router();


const noticias = require("./noticiaRoutes");
const artigos = require("./artigosRoutes")
const membros = require("./membrosRoutes");
const projetos = require("./projetosRoutes");

router.use('/noticias', noticias);
router.use('/artigos', artigos);
router.use('/membros', membros); 
router.use('/projetos', projetos);

module.exports = router;
