const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const projetosController = require('../controllers/projetosController');

const uploadDir = path.resolve(__dirname, '..', 'upload', 'projetos');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + unique + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
}).fields([
    { name: 'imagem', maxCount: 1 }
]);

router.get('/publicos', projetosController.getProjetosPublicados);
router.post('/', upload, projetosController.createProjeto);
router.get('/', projetosController.getAllProjetos);
router.get('/:id', projetosController.getProjetoById);
router.put('/:id', upload, projetosController.updateProjeto);
router.delete('/:id', projetosController.deleteProjeto);

module.exports = router;
