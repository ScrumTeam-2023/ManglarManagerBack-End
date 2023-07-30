'use strict'
const User = require('../user/user.model')
const Department = require('../departments/departments.model')
const { validateData , encrypt , checkPassword} = require('../utils/validate')
const {createToken} = require('../services/jwt')

exports.WaitingDepartment = async()=>{
    try {
        let data = {
            name: 'ON HOLD',
            desc: 'While an user is Getting assigned to their Respective Department'
        }
        let existDep = await Department.findOne({name: 'ON HOLD'})
        if(existDep) return console.log('The Default Department is now Engaged')
        let defDep = new Department(data)
        await defDep.save()
        return console.log(`the department ${defDep}  is now Engaged`)
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
    try{
        let departmentId = req.params.id;
        /* let waitingDep = await Department.findOne({name: 'Waiting Department'})
        if(waitingDep._id == departmentId) return res.status(404).send({message: 'The Waiting Department cannot be deleted'})
            await User.updateMany(
                {department: departmentId},
                {department: waitingDep._id}
            ); */
        //Eliminarlo
        let deleteDeparta = await Department.deleteOne({_id: departmentId})
        if(deleteDeparta.deleteCount === 0)return res.status(404).send({message: 'Departament not found, not deleted'});
        return res.send({message: 'Departament deleted'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting Departament'});
    }
}

// Dos Gets (Todos,Uno)

exports.getDep = async(req,res)=>{
    try {
        let department = await Department.find()
        if (!department) return res.status(404).send({message: 'Department not found'})
        return res.send({department})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error trying to get Departments'})

        
    }
}

exports.getOneDep =async(req,res)=>{
    try {
        let depId = req.params.id
        let findDep = await Department.findOne({_id: depId})
        if(!findDep) return res.status(404).send({message: 'We could not find this Department'})
        return res.send({findDep})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error trying to get single Departament'})
    }
}