const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // defaultValue: 0
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // defaultValue: 1
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '2022-08-17'
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '2022-08-17'
    },

    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'note'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    timestamps: false
  })

}


