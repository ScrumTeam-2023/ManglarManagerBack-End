//controllador de llamada de atencion
'use strict'
const Complaint = require('./Complaint.model')


exports.reminderComplaint = async () => {
    try {
        let data = {
            title: 'Reminder...',
            desc: 'you must Advice to your local superior to Check the complaint on their respective departament'
        }
        let existReminder = await Complaint.findOne({title: 'Reminder...'})
        if(existReminder) return console.log('The complainment reminder is up!')
        let remComp = new Complaint(data)
        await remComp.save()
        return console.log(`the reminder is up...`)
    } catch (err) {
        console.error(err)
    }
}

//add
// [WIP]
exports.makeComplaint = async (req, res) => {
    try {
        let data = req.body
        let comp = new Complaint(data)
        await comp.save()
        return res.status(200).send({ message: 'Your Complaint was sended to Administration!' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ Message: 'Error While Making a Complaint to admin' })

    }
}

exports.getComplaints = async (req, res) => {
    try {
        let getComp = await Complaint.find().populate('departament')
        if (getComp.length === 0) return res.send({ message: 'Theres any Complaint made...' })
        return res.status(200).send({ getComp })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting Complaints' })

    }
}

exports.removeComplaint = async (req, res) => {
    try {
        let compId = req.params.id
        let remComp = await Complaint.findOne({ title: 'Reminder...' })
        if(remComp._id == compId) return res.status(403).send({message:'The reminder cannot be deleted'})

        let compDeleted = await Complaint.findOneAndDelete({ _id: compId })
        if (!compDeleted) return res.status(404).send({ message: 'Complaint not found nor Deleted' })

        return res.status(200).send({ compDeleted })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error Removing Complaint' })

    }
}