'use strict'

const express = require('express')
const api = express.Router()
const ComplaintController = require('./Complaint.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')


//Post
api.post('/addComp',ensureAuth,ComplaintController.makeComplaint)
//Get
api.get('/getComp',ensureAuth,ComplaintController.getComplaints)
//Delete
api.delete('/delComp/:id',ComplaintController.removeComplaint)

module.exports = api