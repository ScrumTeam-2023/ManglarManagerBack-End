'use strict'

const express = require('express')
const api = express.Router()
const DepartmentsController = require('../departments/departments.controller')
//const { ensureAuth, isAdmin } = require('../services/authenticated')

//Post
api.post('/saveDep',DepartmentsController.addDep)

//get
api.get(`/getDeps`,DepartmentsController.getDep)
api.get('/getODep/:id',DepartmentsController.getOneDep)

//Misc
api.put('/edit/:id',DepartmentsController.editDep)
api.delete('/deleteDep/:id',DepartmentsController.deleteDep)
module.exports = api