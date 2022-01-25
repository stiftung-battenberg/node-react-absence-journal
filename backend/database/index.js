const { Sequelize, Model, DataTypes } = require('sequelize')
const relationUserAbsence = require('./relation.user.absence')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const modelDefiners = [
	require('./models/user.model'),
    require('./models/absence.model'),
	require('./models/resetToken.model'),
	require('./models/journal.model'),
	require('./models/journalweek.model')
	// Add more models here...
	// require('./models/item'),
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

relationUserAbsence(sequelize)

sequelize.sync()
sequelize.sync({ alter: true });

module.exports = sequelize