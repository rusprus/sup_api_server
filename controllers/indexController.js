const path = require("path");
const db = require("../db");
const User = db.user;
const UsersService = require('../services/usersService')



exports.index = function (req, res) {
  console.log('Отдаю страницу')
  console.log(path.join(__dirname, '../front/index'))

  // let options = {
  //   headers: {
  //     'Content-Type': 'image/jpeg',
  //   }
  // }
  // res.append('Content-Type', 'image/jpeg')

  res.attachment(path.join(__dirname, '../uploads', req.path))
  res.sendFile(path.join(__dirname, '../uploads', req.path));
};
