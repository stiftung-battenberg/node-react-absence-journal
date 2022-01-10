const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const cookieParser = require('cookie-parser')

const login = require('./routes/login')
const resetPass = require('./routes/resetPassword')
const users = require('./routes/users')
const absence = require('./routes/absence') 

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

login(app)
resetPass(app)
users(app)
absence(app)

module.exports = app