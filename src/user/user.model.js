'use strict'
const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
    ,
    password:{
        type: String,
        required: true
    },
    email:{
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
    role:{
        type: String,
        uppercase: true,
        default: 'EMPLOYEE'
    },
    // idDepartment:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Department',
    //     required: true

    // } wip


},{versionKey: false })

module.exports = mongoose.model('User',userSchema)