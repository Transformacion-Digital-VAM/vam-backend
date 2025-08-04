// CONTROLLER - Actualizado
const path            = require('path');
const fs              = require('fs');
const nodemailer      = require('nodemailer');
const Postulacion     = require('../models/Postulacion');

exports.postular = async (req, res, next) => {
  try {
    // Se añade Titulo vacante a la desestructuración
    const {titulo, nombre, telefono, email, mensaje } = req.body;
    const cv = req.file;
    if (!cv) {
      return res.status(400).json({ message: 'No se recibió el CV' });
    }

    // 1) Guardar el PDF en disco
    const uploadsDir    = path.join(__dirname, '..', 'uploads');
    const filename      = `${Date.now()}_${cv.originalname}`;
    const filePath      = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, cv.buffer);

    // 2) Registrar en la base de datos - Se incluye Titulo vacante
    const nuevaPostulacion = new Postulacion({
      titulo, 
      nombre,
      telefono,
      correo: email,
      mensaje,
      cvpdf: filename
    });
    await nuevaPostulacion.save();

    // 3) Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465', // true si usas 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // 4) Enviar correo con cuerpo HTML mejorado
    const mailOptions = {
      from:     `"${nombre}" <${email}>`,
      // Se actualiza el asunto para incluir el nombre de la vacante
      to:       'mcasr2014@gmail.com',
      subject: `Nueva postulación: ${titulo}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Postulación</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 650px;
              margin: 20px auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #074994ff, #207cca);
              padding: 30px 20px;
              text-align: center;
              color: white;
            }
            .logo-container {
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
            }
            .logo {
              height: 70px;
              width: 70px;
              background-color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              font-weight: bold;
              color: #1e5799;
            }
            .content {
              padding: 30px;
            }
            .title {
              font-size: 24px;
              color: #1e5799;
              margin-bottom: 25px;
              padding-bottom: 15px;
              border-bottom: 2px solid #f0f0f0;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            .data-table td {
              padding: 12px 15px;
              border-bottom: 1px solid #eee;
            }
            .data-table tr:last-child td {
              border-bottom: none;
            }
            .data-table tr td:first-child {
              font-weight: bold;
              color: #555;
              width: 30%;
            }
            .message-container {
              background: #f8f9fa;
              border-left: 4px solid #1e5799;
              padding: 15px;
              margin-top: 20px;
              border-radius: 0 4px 4px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              background: #f0f4f8;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Postulación Recibida</h1>
            </div>

            <div class="content">
              <h2 class="title">Detalles de la postulación</h2>

              <table class="data-table">
                <!-- Nombre de la vacante -->
                <tr>
                  <td>Nombre Vacante:</td>
                  <td>${titulo}</td>
                </tr>
                <tr>
                  <td>Nombre:</td>
                  <td>${nombre}</td>
                </tr>
                <tr>
                  <td>Teléfono:</td>
                  <td>${telefono}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>${email}</td>
                </tr>
              </table>

              <h3>Mensaje del candidato:</h3>
              <div class="message-container">
                ${mensaje ? mensaje.replace(/\n/g, '<br>') : '<em>(El candidato no incluyó un mensaje adicional)</em>'}
              </div>

              <p style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
                <strong>Nota:</strong> El CV del candidato se adjunta a este correo en formato PDF.
              </p>
            </div>

            <div class="footer">
              <p>Este correo fue generado automáticamente. Por favor, no responda a este mensaje.</p>
              <p>&copy; ${new Date().getFullYear()} - Sistema de Postulaciones</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename,
          path: filePath
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    // 5) Responder al cliente
    res.status(201).json({ message: 'Postulación recibida y correo enviado.' });

  } catch (err) {
    console.error('Error en postulación:', err);
    next(err);
  }
};