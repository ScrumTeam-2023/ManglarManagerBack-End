'use strict'

const express = require('express')
const api = express.Router()
const TaskController = require('../task/task.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')

api.post('/assign',TaskController.assign)
api.get(`/get`,TaskController.getTasks)

module.exports = api
