
function relationUserAbsence(sequelize) {
	const { absence, user, journal, journalweek } = sequelize.models;
	
	user.hasMany(absence, {
		as: 'user',
		foreignKey: 'userId'
	});
	absence.belongsTo(user, {
		as: 'user',
		foreignKey: 'userId'
	})
	absence.belongsTo(user, {
		as: 'validatedBy'
	})
	user.hasMany(journalweek, {
		as: 'user_journal',
		foreignKey: 'userId'
	})
	journalweek.belongsTo(user, {
		as: 'user_journal',
		foreignKey: 'userId'
	})
	journalweek.belongsTo(user, {
		as: "validatedBy"
	})
	journalweek.hasMany(journal)
}

module.exports =  relationUserAbsence;