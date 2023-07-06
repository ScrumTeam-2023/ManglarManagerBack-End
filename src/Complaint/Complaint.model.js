'use strict'


const mongoose = require('mongoose')

const complaintSchema = mongoose.Schema({
    title: {
        type: String,
          minLength: 5,
        required: true
    },
    desc: {
        type: String,
        minLength: 5,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    date: {
        type: Date,
        default: Date.now(),
        required: false
    }
})

module.exports = mongoose.model('Complaint',complaintSchema)