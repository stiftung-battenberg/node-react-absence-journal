const { DataTypes } = require("sequelize/dist");
 
module.exports = ( sequelize ) => {
    sequelize.define('ResetToken', {
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        email : {
            allowNull: false,
            type: DataTypes.STRING
        },
        token : {
            allowNull: false,
            type: DataTypes.STRING
        },
        expiration: {
            allowNull: false,
            type: DataTypes.DATE
        },
        used: {
            type: DataTypes.INTEGER
        },
    })
}