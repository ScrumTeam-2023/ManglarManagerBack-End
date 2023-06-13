'use strict'

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    desc: {
        type: String,
        trim: true,
        //elimina espacios inecesarios
        required: true
    },
    complete: {
        type: Boolean,
        default: false,
    },

    assigned:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

},{versionKey : false})