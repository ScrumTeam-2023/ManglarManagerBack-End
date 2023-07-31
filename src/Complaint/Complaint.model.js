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
        minLength: 3,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: false
    },
    departament: {
        //adds department that requires help
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depart',
        required: false,
        
    }
})

module.exports = mongoose.model('Complaint',complaintSchema)