//Controllador de Tareas
'use strict'
const Task = require(`../task/task.model`)
const User = require('../user/user.model')
const { validateData , encrypt , checkPassword } = require('../utils/validate')
const { createToken } = require('../services/jwt')

exports.assign = async (req,res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ id: data.user})
        if(!user) return res.status(404).send({message:'Sorry this user does not exist'})
        let task = new Task(data);
        await task.save();

        if(!task) return res.status(418).send({message: `Sorry somehow you managed to screw the task function... sooo`})
        return res.send({message: `task assigned succesfully!`,task})



    } catch (err) {
        console.error(err)
      return res.status(500).send({message: `Error at Assigning task`})
        
    }
}

exports.getTasks = async(req,res) => {
    try {
        let tasks = await Task.find().populate('idUser')
        if(tasks.length === 0) return res.send({message: 'Theres no assigments yet'})
        return res.send({tasks})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: `Error at Getting task`})
        
    }
}