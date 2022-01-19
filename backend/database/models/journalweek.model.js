const { DataTypes } = require("sequelize/dist");
 
module.exports = ( sequelize ) => {
    sequelize.define('journalweek', {
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        weekNumber : {
            allowNull: false,
            type: DataTypes.TINYINT
        },
        start : {
            type: DataTypes.DATEONLY
        },
        finish : {
            type: DataTypes.DATEONLY
        },
        validated : {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}