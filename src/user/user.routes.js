'use strict'


const express = require('express')
const api = express.Router()
const UserController = require('../user/user.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')

///Posts
api.post('/save', UserController.save)
api.post('/login',UserController.login)

//Gets
api.get('/get',UserController.getUsers)
api.get('/getOne',UserController.getOneUser)
api.get('/getProfile',UserController.getProfile)

//Miscellaneous
api.delete('/delete/:id',UserController.delete)
api.put('/update/:id',UserController.editUser)

module.exports = api