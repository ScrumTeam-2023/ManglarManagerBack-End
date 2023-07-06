'use strict'

const express = require('express')
const api = express.Router()
const TaskController = require('../task/task.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')

api.post('/assign',TaskController.assign)
api.get(`/get`,TaskController.getTasks)
api.get('/LoginTask',ensureAuth,TaskController.getTaskByUser)
api.put('/updateStatus/:id',TaskController.updateStatus)
api.delete('/delete/:id',TaskController.finishTask)

module.exports = api
