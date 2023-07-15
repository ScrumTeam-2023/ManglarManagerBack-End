//Controllador de Tareas
'use strict'
const Task = require(`../task/task.model`)
const User = require('../user/user.model')
const Departament = require('../departments/departments.model')
const { validateData , encrypt , checkPassword } = require('../utils/validate')
const { createToken } = require('../services/jwt')

exports.assign = async (req,res) => {
    try {
        let { status } = req.body
        let data = req.body;
        let user = await User.findOne({ id: data.user})
       

        // if( !status || !(
        //     status == 'INCOMPLETE' ||
        //     status == 'COMPLETED'))
        // return res.status(400).send({message: 'Invalid Status Values \n You MUST include COMPETE or INCOMPLETE in Uppercase'})

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
        let gettasks = await Task.find().populate('idUser',{password:0,role:0});
        if(gettasks.length === 0) return res.send({message: 'Theres no assigments yet'})
        return res.send({gettasks})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: `Error at Getting task`})
        
    }
}

exports.getSingleTask = async(req,res)=>{
    try {
        let taskId = req.params.id;
        let findSTask = await Task.findOne({_id: taskId}).populate('idUser',{password:0,role:0})
        if(findSTask.length === 0) return res.send({message: 'You Have no assigments yet'})
        if(!findSTask) return res.status(404).send({message:'This task does not exist'})

        return res.send({findSTask})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: `Error at Getting task`})
    }
}


// [WIP] //Encontrar Tareas del Usuario Logueado con su token
exports.getTaskByUser = async(req, res) => {
    try {
       
        //Hallar token
        let userToken = await User.findOne({_id: req.user.sub})
        console.log(userToken);
        if(!userToken) return res.status(404).send({message:'Rip bozo'})

        //encontrar por token encontrado
        let findTask = await Task.find({idUser: userToken._id}).populate('idUser',{password:0,role:0})
        if(findTask.length === 0) return res.send({message: 'You Have no assigments yet'})
       
        return res.send({findTask})
       
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: `Error at Getting YOUR tasks`})
        
    }
}

exports.updateStatus = async(req,res)=>{
    try {
        let { status } = req.body

        let TaskId = req.params.id;
            
        if( !status || !(
            status == 'INCOMPLETE' ||
            status == 'COMPLETED')) return res.status(400).send({message: 'Invalid Status Values \n You MUST include COMPETED or INCOMPLETE in Uppercase'})
       

        let updatedStatus = await Task.findOneAndUpdate(
            {_id: TaskId}, { status: status },{new:true}
        )
        
        if(!updatedStatus) return res.status(404).send({message: 'Status is Required'})
        
        return res.send({message: 'Status Changed to',updatedStatus})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error While Updating Status'})
        
    }
}

exports.finishTask = async(req,res) => {
    try {
        let taskId = req.params.id
        let deletedTask = await Task.findOneAndDelete({_id: taskId})
        if(!deletedTask) return res.status(404).send({message:'Task Not found nor Deleted'})

        return res.status(200).send({message: 'Task Deleted:', deletedTask})

    } catch (err) {
        console.error(err)
        
    }
}