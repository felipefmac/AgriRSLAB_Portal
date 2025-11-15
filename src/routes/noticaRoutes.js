const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticiaController');
const multer = require('multer');
const path = require('path');

// --- Configuração do Multer para Upload de Imagem ---
const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads', 'noticias');

// Garante que o diretório exista
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'noticia-' + uniqueSuffix + ext);
    }
});
// Define o 'upload' como 'imagem' (o nome do campo no formulário)
const upload = multer({ storage: storage });
// ----------------------------------------------------

// === ROTAS PÚBLICAS ===
router.get('/', noticeController.getAllNoticias);
router.get('/destaques', noticeController.getDestaqueNoticias);
router.get('/defesas', noticeController.getDefesasNoticias);
router.get('/eventos', noticeController.getEventosMesAtual);

// === ROTAS DE ADMIN ===

// GET: Lista TODAS as notícias (incluindo as ocultas)
router.get('/admin', noticeController.getAllNoticiasAdmin);

// POST: Criar notícia (ADICIONADO O 'upload.single')
router.post('/', upload.single('imagem'), noticeController.createNoticia);

// PUT: Atualizar notícia (ADICIONADO O 'upload.single')
router.put('/:id', upload.single('imagem'), noticeController.updateNoticia);

// PATCH: Mudar o status 'exibir' (o switch)
router.patch('/:id/toggle', noticeController.toggleNoticiaExibir);

// DELETE: Deletar notícia
router.delete('/:id', noticeController.deleteNoticia);

module.exports = router;