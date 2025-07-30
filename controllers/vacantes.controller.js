const Vacante = require('../models/Vacantes');

// Obtener todas las vacantes
exports.getAllVacantes = async (req, res, next) => {
  try {
    const vacantes = await Vacante.find();
    res.json(vacantes);
  } catch (err) {
    next(err);
  }
};

// Obtener vacante por ID
exports.getVacanteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vacante = await Vacante.findById(id);
    if (!vacante) return res.status(404).json({ message: 'Vacante no encontrada' });
    res.json(vacante);
  } catch (err) {
    next(err);
  }
};

// Crear nueva vacante
exports.createVacante = async (req, res, next) => {
  try {
    const vacante = new Vacante(req.body);
    const saved = await vacante.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Actualizar vacante
exports.updateVacante = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Vacante.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Vacante no encontrada' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Eliminar vacante
exports.deleteVacante = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Vacante.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Vacante no encontrada' });
    res.json({ message: 'Vacante eliminada' });
  } catch (err) {
    next(err);
  }
};
