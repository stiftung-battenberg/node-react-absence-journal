const express = require('express');
const login = require('./routes/login')
const resetPass = require('./routes/resetPassword')
const bodyParser = require('body-parser');
var cors = require('cors')
const cookieParser = require('cookie-parser')
const users = require('./routes/users')

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

login(app)
resetPass(app)
users(app)

module.exports = app