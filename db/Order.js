const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:  'unknow'
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue:  '2022-08-17'
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue:  '2022-08-17'
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'note'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  },{
    timestamps: false
  })
  
}


