// server.js
require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Ruta para almacenar archivos estáticos (CVs)
app.use("/uploads", express.static("uploads"));

// Rutas
app.use('/vacantes', require('./routes/vacantes.routes'));
app.use('/postulacion', require('./routes/postulacion.routes'));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
