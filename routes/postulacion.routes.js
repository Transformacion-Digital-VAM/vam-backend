const express = require('express');
const multer  = require('multer');
const router  = express.Router();
const upload  = multer(); 
const controller = require('../controllers/postulacion.controller');

router.post('/', upload.single('cv'), controller.postular);

module.exports = router;