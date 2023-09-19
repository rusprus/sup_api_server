const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define('msg', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    nsp: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '/'
    },
    room: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'note'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    createdAt: {
      type: DataTypes.STRING
    }
  },{
    // timestamps: true
  })
  
}


