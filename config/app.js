'use strict'
//Dev Routes
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;
//Rutas Entidades
const UserRoutes = require('../src/user/user.routes')
const TaskRoutes = require('../src/task/task.routes')
const DepRoutes = require('../src/departments/departments.routes')
const ComplaintRoutes = require('../src/Complaint/Complaint.routes')

//Entity routes

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))


//Rutas Entidades
app.use('/user',UserRoutes)
app.use('/task',TaskRoutes)
app.use('/dep',DepRoutes)
app.use ('/comp', ComplaintRoutes)
//servidor

exports.initServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Servidor corriendo en el puerto ${port}`)
    })
}

