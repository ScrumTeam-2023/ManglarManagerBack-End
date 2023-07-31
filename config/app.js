'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app); // Crear servidor HTTP
const io = require('socket.io')(http); // Configurar Socket.IO con el servidor HTTP

const port = process.env.PORT || 3000;

// Rutas Entidades
const UserRoutes = require('../src/user/user.routes');
const TaskRoutes = require('../src/task/task.routes');
const DepRoutes = require('../src/departments/departments.routes');
const ComplaintRoutes = require('../src/Complaint/Complaint.routes');
const MessageRoutes = require('../src/comunication/message.routes');

//Entity routes

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Rutas Entidades
app.use('/user',UserRoutes)
app.use('/task',TaskRoutes)
app.use('/dep',DepRoutes)
app.use('/comp', ComplaintRoutes)
app.use('/chat',MessageRoutes)

//servidor

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  // Manejar el evento de envío de mensaje
  socket.on('enviarMensaje', async (data) => {
    try {
      // Aquí puedes implementar la lógica para guardar el mensaje en la base de datos
      // y luego emitirlo a todos los clientes conectados para que se actualice la vista de chat
      io.emit('nuevoMensaje', data);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  });

  // Otros eventos de Socket.IO, como eliminar mensajes, actualizaciones en tiempo real, etc., pueden ser agregados aquí

  // Manejar el evento de desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Middlewares y rutas como en tu código original

// Servidor
exports.initServer = () => {
  http.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};
