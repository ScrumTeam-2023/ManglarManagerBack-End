//controllador de llamada de atencion
'use strict'
const Complaint = require('./Complaint.model')

//add
// [WIP]
exports.makeComplaint = async(req,res)=>{
    try {
      
        let comp = new Complaint(data)
        await comp.save()
        return res.status(200).send({message: 'Your Complaint was sended to Administration!'})

    } catch (err) {
        console.error(err)
        return res.status(500).send({Message: 'Error While Making a Complaint to admin'})
        
    }
}

exports.getComplaints = async(req,res)=>{
    try {
        let getComp = await Complaint.find().populate('user')
        if(tasks.length === 0) return res.send({message: 'Theres no assigments yet'})
        return res.status(200).send({getComp})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting Complaints'})
        
    }
}

exports.removeComplaint = async(req,res)=>{
    try {
        let compId = req.params.id
        let compDeleted = await Complaint.findOneAndDelete({_id: compId})
        if(!compDeleted) return res.status(404).send({message:'Complaint not found nor Deleted'})

        return res.status(200).send({compDeleted})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error Removing Complaint'})
        
    }
}