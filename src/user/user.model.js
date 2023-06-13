'use Strict'
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    age:{
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
        required: false,
        uppercase: true,
        default: 'EMPLOYEE'
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depart',
        required: true
    },



},{versionKey : false})

module.exports = mongoose.model(`User`, userSchema)