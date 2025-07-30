const mongoose = require("mongoose");

const PostulacionSchema = new mongoose.Schema({
  vacanteId: { type: String, required: true }, 
  titulo: { type: String, required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  mensaje: { type: String, required: false },
  cvpdf: { type: String, required: true }, 
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Postulacion", PostulacionSchema);