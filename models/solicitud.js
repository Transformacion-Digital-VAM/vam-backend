const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombre: {
  type: String,
  required: true,
},
  domicilio: {
  type: String,
  required: true,
},
  fechaNacimiento: {
  type: Date,
  required: true,
},
  telefono: {
  type: String,
  required: true,
},
  email: {
  type: String,
  required: true,
},
  localidad: {
  type: String,
  required: true,
},
  clienteExistente: {
  type: String,
  enum:['Sí', 'No'],
  required: true,
},
  monto: {
    type: String,
    required: true
  },
  terminosCondiciones: {
    type: Boolean,
    required: true
  }

});

module.exports = mongoose.model('Solicitud', solicitudSchema);