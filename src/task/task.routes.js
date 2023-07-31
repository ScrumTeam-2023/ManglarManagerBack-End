'use strict'

const express = require('express')
const api = express.Router()
const TaskController = require('../task/task.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.post('/assign',  [ensureAuth, isAdmin], TaskController.assign)
api.get(`/get`, ensureAuth, TaskController.getTasks)
api.get('/getTask',TaskController.obtenerContadorTareas)
api.get('/EmployeeTask',TaskController.getUsersOrderedByCompletedTasks)
api.get('/LoginTask', ensureAuth, TaskController.getTaskByUser)
api.get('/getOne/:id',ensureAuth,TaskController.getSingleTask)


api.put('/updateStatus/:id', ensureAuth, TaskController.updateStatus)
api.delete('/delete/:id', [ensureAuth, isAdmin], TaskController.finishTask)

module.exports = api
