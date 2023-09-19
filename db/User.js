const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    mng_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 0
    },
    login: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      // allowNull: true
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: "guest",
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tlg: {
      type: Sequelize.STRING,
      defaultValue: "",
      // allowNull: false
    },

    photo: {
      type: Sequelize.STRING,
      defaultValue: "default.jpg",
      allowNull: true
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
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
    note: {
      type: Sequelize.TEXT,
      defaultValue: "",
      // allowNull: false
    },
  },

    {
      timestamps: false
    })

}


