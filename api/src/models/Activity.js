const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
          type: DataTypes.ENUM ("1", "2" ,"3" ,"4" ,"5")
      },
      duration: {
          type: DataTypes.STRING
      },
      season: {
          type: DataTypes.ENUM ("summer", "spring", "winter", "autumn")
      }
    },  {timestamps: false});
};