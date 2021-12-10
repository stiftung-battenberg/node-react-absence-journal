const { DataTypes } = require("sequelize/dist");
 
module.exports = ( sequelize ) => {
    sequelize.define('absence', {
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        from : {
            allowNull: false,
            type: DataTypes.DATE
        },
        to : {
            allowNull: false,
            type: DataTypes.DATE
        },
        motif: {
            allowNull: false,
            type: DataTypes.STRING
        },
        comment: {
            type: DataTypes.STRING
        },
        validated: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false 
        }
    })
}