const express = require('express');
const router = express.Router();
const controller = require('../controllers/vacantes.controller');

router.get('/', controller.getAllVacantes);
router.get('/:id', controller.getVacanteById);
router.post('/', controller.createVacante);
router.put('/:id', controller.updateVacante);
router.delete('/:id', controller.deleteVacante);

module.exports = router;
