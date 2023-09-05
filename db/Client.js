const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define('client', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: true,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // defaultValue: 0
    },
    fio: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue:  'unknow'
    },
    tlg: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue:  '2022-08-17'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ''
    },
  },{
    timestamps: false
  })
  
}


