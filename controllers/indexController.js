const path = require("path");
const db = require("../db");
const User = db.user;
const UsersService = require('../services/usersService')



exports.index = function (request, response) {
  res.sendFile(path.join(__dirname, '../sup-admin/dist/index'));
};
