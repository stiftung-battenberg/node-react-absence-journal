const { DataTypes } = require("sequelize/dist");
 
module.exports = ( sequelize ) => {
    sequelize.define('journal', {
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        date : {
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        comment: {
            type: DataTypes.STRING
        },
        activity: {
            type: DataTypes.STRING
        },
    })
}