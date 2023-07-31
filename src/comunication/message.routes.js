'use strict'

const express = require('express');
const api = express.Router()
const router = express.Router();
const messageController = require('./message.controller');
const {ensureAuth, isAdmin } = require('../services/authenticated')


// Ruta para enviar un mensaje
api.post('/sendmessage',ensureAuth,messageController.sendMessage);
api.get('/messages/:receiverId',ensureAuth, messageController.getMessagesWithUser);
api.delete('/delete/:id',ensureAuth,messageController.deleteMessage)


module.exports = api
