const express = require("express");
const router = express.Router();


const noticia = require("./noticaRoutes");
const artigo = require("./artigosRoutes")


router.use('/noticias', noticia);
router.use('/artigos', artigo);


module.exports = router;
