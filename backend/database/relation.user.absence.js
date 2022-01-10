
function relationUserAbsence(sequelize) {
	const { absence, user, journal, journalweek } = sequelize.models;

	user.hasMany(absence);
	absence.belongsTo(user, {
		as: 'validatedBy'
	})
	user.hasMany(journalweek)
	journalweek.belongsTo(user, {
		as: "validatedBy"
	})
	journalweek.hasMany(journal)
}

module.exports =  relationUserAbsence;