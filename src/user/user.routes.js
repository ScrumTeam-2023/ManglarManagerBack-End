'use strict'


const express = require('express')
const api = express.Router()
const UserController = require('../user/user.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')

///Posts
api.post('/save',[ensureAuth, isAdmin], UserController.save)
api.post('/login',UserController.login)

//Gets
api.get('/get',ensureAuth,UserController.getUsers)
api.get('/getOne/:id',ensureAuth,UserController.getOneUser)
api.get('/getProfile',ensureAuth,UserController.getProfile)
api.get('/todos',ensureAuth,UserController.getAllUsers)

//Miscellaneous
api.delete('/delete/:id',[ensureAuth, isAdmin],UserController.delete)
api.put('/update/:id',[ensureAuth, isAdmin],UserController.editUser)
api.put('/updateProfile/:id',ensureAuth,UserController.editProfile)

module.exports = api