'use strict'
// pa

require('dotenv').config();

const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const userController = require('./src/user/user.controller')
const depController = require('./src/departments/departments.controller')
const sanityOfComplainment = require('./src/Complaint/Complaint.controller')


mongoConfig.connect()
app.initServer();
depController.WaitingDepartment();
userController.defaultAdmin();
sanityOfComplainment.reminderComplaint();