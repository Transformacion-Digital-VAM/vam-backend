const express = require('express');
const router = express.Router();
const { crearSolicitud, obtenerSolicitudes } = require('../controllers/presolicitud.controller');

// POST /api/solicitudes
router.post('/', crearSolicitud);
router.get('/', obtenerSolicitudes)

module.exports = router;
