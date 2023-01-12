const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: "guest",
      allowNull: false
    },
   
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      // allowNull: true
    },
  },{
    timestamps: false
  })
  
}


