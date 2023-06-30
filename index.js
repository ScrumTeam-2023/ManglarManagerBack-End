'use strict'
// pa

require('dotenv').config();

const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const userController = require('./src/user/user.controller')
const depController = require('./src/departments/departments.controller')

mongoConfig.connect()
app.initServer();
userController.defaultAdmin();
depController.WaitingDepartment();