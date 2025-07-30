const mongoose = require('mongoose');
const { Schema } = mongoose;

const VacanteSchema = new Schema({
  titulo: { type: String, required: true },
  area: String,
  descripcion: String,
  requisitos: [String],
  beneficios: [String],
  horario: {
    dias: String,
    horas: String
  },
  ubicacion: String,
  modalidad: String,
  tipo: String,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vacante', VacanteSchema);
