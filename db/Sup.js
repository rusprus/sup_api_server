const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define('sup', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:  'unknow'
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:  'unknow'
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:  ''
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


