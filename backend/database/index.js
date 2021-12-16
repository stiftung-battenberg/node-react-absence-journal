const { Sequelize, Model, DataTypes } = require('sequelize')
const relationUserAbsence = require('./relation.user.absence')

const sequelize = new Sequelize('absence-journal-manager', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const modelDefiners = [
	require('./models/user.model'),
    require('./models/absence.model'),
	require('./models/resetToken.model')
	// Add more models here...
	// require('./models/item'),
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

relationUserAbsence(sequelize)

sequelize.sync({ alter: true });

module.exports = sequelize