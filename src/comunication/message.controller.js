//Comunication Controller
'use strict'
const jwt = require('jsonwebtoken');
const Message = require('./message.model'); 


//NEW MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    // Obtener el contenido del mensaje y el destinatario del cuerpo de la solicitud
    const { contenido, idDestinatario } = req.body;

    // Obtener el token de autorización de los headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token de autorización no proporcionado' });
    }

    try {
      // Verificar y decodificar el token para obtener el ID del remitente
      const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
      const idRemitente = decodedToken.sub;

      // Validar que se haya proporcionado contenido y destinatario
      if (!contenido || !idDestinatario) {
        return res.status(400).json({ error: 'Contenido y destinatario son campos obligatorios' });
      }

      // Crear el nuevo mensaje
      const nuevoMensaje = new Message({
        content: contenido,
        sender: idRemitente,
        receiver: idDestinatario,
      });

      // Guardar el mensaje en la base de datos
      const mensajeGuardado = await nuevoMensaje.save();

      return res.status(201).json(mensajeGuardado);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      return res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};

//GET MESSAGE

    exports.getMessagesWithUser = async (req, res) => {
        try {
        // Obtener el ID del usuario logeado desde el token
        const userToken = req.user;
        const loggedUserId = userToken.sub;
    
        // Obtener el ID del receptor de los parámetros de la ruta
        const receiverId = req.params.receiverId;
    
        // Buscar los mensajes que coincidan con el ID del remitente y el ID del receptor
        const messages = await Message.find({
            $or: [
            { sender: loggedUserId, receiver: receiverId },
            { sender: receiverId, receiver: loggedUserId },
            ],
        }).sort({ createdAt: 1 }); // Ordenar los mensajes por fecha de creación ascendente
    
        // Enviar los mensajes encontrados en la respuesta
        return res.json(messages);
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los mensajes' });
        }
    };

  //DELETE

  exports.deleteMessage = async (req, res) => {
    try {
      const messageId = req.params.id; // ID del mensaje a eliminar
  
      // Verificar si el mensaje existe en la base de datos
      const message = await Message.findById(messageId);
      if (!message) {
        return res.status(404).json({ error: 'Mensaje no encontrado' });
      }
  
      // Verificar si ha pasado más de un minuto desde que se envió el mensaje
      const currentTime = Date.now();
      const messageTime = new Date(message.createdAt).getTime();
      const timeDifference = currentTime - messageTime;
      const oneMinute = 60 * 1000; // Un minuto en milisegundos
  
      if (timeDifference > oneMinute) {
        return res.status(403).json({ error: 'Ha pasado más de un minuto desde que se envió el mensaje. No se puede eliminar.' });
      }
  
      // Verificar si el usuario que realiza la solicitud es el remitente del mensaje
      if (message.sender.toString() !== req.user.sub) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este mensaje.' });
      }
  
      // Eliminar el mensaje de la base de datos
      await Message.findByIdAndDelete(messageId);
  
      return res.json({ message: 'Mensaje eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'No se puede eliminar el mensaje en este momento.' });
    }
  };

  
  
  
  