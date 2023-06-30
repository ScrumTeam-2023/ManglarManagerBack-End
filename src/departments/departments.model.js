'use Strict'
const mongoose = require('mongoose');

const depSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        upperCase: true,
        minLength: 3
    },
    
    desc: {
        type: String,
        required: true,
    }


},{versionKey : false})

module.exports = mongoose.model(`Depart`, depSchema)