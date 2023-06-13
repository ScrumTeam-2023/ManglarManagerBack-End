'use Strict'
const mongoose = require('mongoose');

const depSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    
    desc: {
        type: String,
        required: false,
    }


},{versionKey : false})

module.exports = mongoose.model(`Depart`, userSchema)