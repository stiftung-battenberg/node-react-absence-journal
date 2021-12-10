
function relationUserAbsence(sequelize) {
	const { absence, user } = sequelize.models;
	user.hasMany(absence);
	absence.belongsTo(user);
}

module.exports =  relationUserAbsence;