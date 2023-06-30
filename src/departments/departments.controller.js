'use strict'
const User = require('../user/user.model')
const Department = require('../departments/departments.model')
const { validateData , encrypt , checkPassword} = require('../utils/validate')
const {createToken} = require('../services/jwt')

exports.WaitingDepartment = async()=>{
    try {
        let data = {
            name: 'Waiting',
            desc: 'While an user is Getting assigned to their Respective Department'
        }
        let existDep = await Department.findOne({name: 'Waiting Department'})
        if(existDep) return res.status(403).send({message: 'This Department already Engaged'})
        let defDep = new Department(data)
        await defDep.save()
        return console.log(`the department is now Engaged`)
    } catch (err) {
        console.error(err)
        return err
        
    }
}

exports.addDep = async(req,res)=>{
    try {
        let data = req.body
        let existDep = await Department.findOne({name: data.name})
    

        let dep = new Department(data)
        if(existDep) return res.status(401).send({message: 'There is already a Department with this name'})
        await dep.save()
        return res.status(200).send({message: 'Department Created Succesfully!'})

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error While adding a Department bozo'})
        
    }
}

exports.editDep = async(req,res)=>{
    try {
        let depId = req.params.id;
        let data = req.body

        let updatedDep = await Department.findOneAndUpdate(
            {_id: depId},data,{new:true}
        )
        if(!updatedDep) return res.status(404).send({message: 'Department not found nor Updated'})
        return res.send({message: 'Department Updated Succesfully!',updatedDep})
        
        
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error While Editing this Department'})
        
    }
}


exports.deleteDep = async(req,res)=>{
    try {
        let departmentId = req.params.id
        let waitingDep = await Department.findOne({name: 'Waiting Department'})
        if(waitingDep._id == departmentId) return res.status(404).send({message: 'The Waiting Department cannot be deleted'})
            await User.updateMany(
                {department: departmentId},
                {department: waitingDep._id}
            );

            let deletedDep = await Department.findOneAndDelete({_id: departmentId})
                if(!deletedDep) return res.status(404).send({message: 'Department not found Nor updated'})

            return res.send({message: 'Department deleted',deletedDep})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error trying to delete Department'})
        
    }
}

// Dos Gets (Todos,Uno)