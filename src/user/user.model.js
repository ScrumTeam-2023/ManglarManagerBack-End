'use strict'
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    phone: {
        type: String,
        required: true,
        unique: true
        


    },

    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 15) {
                throw new Error("Age Cannot be 15 or Below");
            }
        }
    }
    ,
    role: {
        type: String,
        uppercase: true,
        default: 'EMPLOYEE'
    },
    departament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depart',
        required: false,


    }


}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)