const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const routesDefiners = [
	require('./routes/login'),
    require('./routes/resetPassword'),
    require('./routes/users'),
    require('./routes/absence'), 
    require('./routes/journal') 
	// Add more routes here...
	// require('./routes/item'),
]

const app = express()

app.use(cors({credentials: true, origin: process.env.CLIENT_HOST}))
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

for (const routesDefiner of routesDefiners) {
	routesDefiner(app);
}

module.exports = app