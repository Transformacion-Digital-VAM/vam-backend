const Solicitud = require('../models/solicitud');
const nodemailer = require('nodemailer');

exports.crearSolicitud = async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();

    //  transporte para enviar el correo
    const transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 309,
      secure: true,
      auth:{
        user: 'danielamanzanorangel@gmail.com',
        pass: 'uqyu ylii gzug lovb',
      }
    });

    // correo
    const mailOptions = {
      from: process.env.user,
      to: 'supervision.area.operativa@vamosamejorar.com, vamosamejorar@vamosamejorar.com',
      subject: 'Nueva solicitud de crédito',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Nueva solicitud de crédito recibida</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #0056b3;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    border: 1px solid #ddd;
                    border-top: none;
                    padding: 20px;
                    border-radius: 0 0 5px 5px;
                }
                .data-row {
                    margin-bottom: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #eee;
                }
                .data-row:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .label {
                    font-weight: bold;
                    color: #0056b3;
                    display: inline-block;
                    width: 180px;
                }
                .value {
                    display: inline-block;
                }
                .highlight {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 20px;
                    border-left: 4px solid #0056b3;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Nueva solicitud de crédito recibida</h1>
            </div>
            
            <div class="content">
                <div class="data-row">
                    <span class="label">Nombre completo:</span>
                    <span class="value">${nuevaSolicitud.nombre}</span>
                </div>
                
                <div class="data-row">
                    <span class="label">Fecha de nacimiento:</span>
                    <span class="value">${nuevaSolicitud.fechaNacimiento.toLocaleDateString()}</span>
                </div>
                
                <div class="data-row">
                    <span class="label">Domicilio:</span>
                    <span class="value">${nuevaSolicitud.domicilio}</span>
                </div>
                
                <div class="data-row">
                    <span class="label">Teléfono:</span>
                    <span class="value">${nuevaSolicitud.telefono}</span>
                </div>
                
                <div class="data-row">
                    <span class="label">Correo electrónico:</span>
                    <span class="value">${nuevaSolicitud.email}</span>
                </div>
                
                <div class="data-row">
                    <span class="label">Municipio:</span>
                    <span class="value">${nuevaSolicitud.localidad}</span>
                </div>
                
                <div class="highlight">

                    
                    <div class="data-row">
                        <span class="label">Cliente existente:</span>
                        <span class="value">${nuevaSolicitud.clienteExistente ? 'Sí' : 'No'}</span>
                    </div>
                    
                    <div class="data-row">
                        <span class="label">Monto solicitado:</span>
                        <span class="value">${nuevaSolicitud.monto}</span>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>Este es un mensaje automático, por favor no responda directamente a este correo.</p>
                <p>© ${new Date().getFullYear()} Vamos a Mejorar - Todos los derechos reservados</p>
            </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      mensaje: 'Solicitud registrada exitosamente y correo enviado',
      data: nuevaSolicitud
    });

  } catch (error) {
    console.error('Error al registrar solicitud:', error);
    res.status(400).json({
      mensaje: 'Error al registrar solicitud',
      error: error.message
    });
  }
};



exports.obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes);
  }
      catch (error){
        console.error('Error al obtener las solicitudes: ', error);
        res.status(500).json({mesaje: 'Error al obtener las solicitudes'});
      }
}
