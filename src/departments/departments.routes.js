'use strict'

const express = require('express')
const api = express.Router()
const DepartmentsController = require('../departments/departments.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

//Post
api.post('/saveDep',[ensureAuth , isAdmin],DepartmentsController.addDep)

//get
api.get(`/getDeps`,DepartmentsController.getDep)
api.get('/getODep/:id',DepartmentsController.getOneDep)

//Misc
api.put('/edit/:id',ensureAuth,DepartmentsController.editDep)
api.delete('/deleteDep/:id',[ensureAuth , isAdmin],DepartmentsController.deleteDep)
module.exports = api