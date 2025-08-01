require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Conexión a MongoDB
const solicitud = require('./routes/presolicitud.routes');

connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas de prueba o principales
app.use('/api/solicitudes', solicitud);
app.get('/', (req, res) => {
  res.send('Esta funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});