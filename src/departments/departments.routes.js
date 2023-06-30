'use strict'

const express = require('express')
const api = express.Router()
const DepartmentsController = require('../departments/departments.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

//Post
api.post('/saveDep',DepartmentsController.addDep)

//get


//Misc
api.put('/edit/:id',DepartmentsController.editDep)

module.exports = api