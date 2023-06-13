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
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
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


    age: {
      type: Sequelize.INTEGER,
      // allowNull: true
    },
    photo: {
      type: Sequelize.STRING,
      defaultValue: "default.jpg",
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
    note_eml: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    note_tlg: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    }
  },
    {
      timestamps: false
    })

}


