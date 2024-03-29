'use strict'

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    desc: {
        type: String,

        //elimina espacios inecesarios
        required: true,
        maxLengt: 150
    },
    status: {
        type: String,
        upperCase: true,
        required: true,
        default: 'INCOMPLETE',
    },

    date: {
        type: Date,
        default: Date.now(),
        required: false

    },

    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

},{versionKey : false})

module.exports =  mongoose.model('Task',taskSchema)