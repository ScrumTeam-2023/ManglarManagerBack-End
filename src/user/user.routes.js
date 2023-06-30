'use strict'

'use strict'

const express = require('express')
const api = express.Router()
const UserController = require('../user/user.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')


api.post('/save', UserController.save)
api.get('/get',UserController.getUser)
api.post('/login',UserController.login)
api.get('/getSingle/:id',UserController.getSingleUser)
api.delete('/delete/:id',UserController.delete)
api.put('/update/:id',UserController.editUser)

module.exports = api