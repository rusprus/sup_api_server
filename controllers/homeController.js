const path = require("path");
const db = require("../db");
const User = db.user;
const Order = db.order;


exports.index = function (request, response) {
    response.sendFile(path.join(__dirname, '../public/index.html'));
    // response.render("index.html");
};


exports.about = function (request, response) {
    console.log(toString( User ))
    response.send("О сайте");
};

// получение данных
exports.orders = function(req, res){
  console.log('send, orders')

    Order.findAll({raw: true }).then(data=>{
      res.json({
        orders: data
      })
    }).catch(err=>console.log(err));
};

exports.login = function (request, response) {
  console.log('send password, login')
  // response.send("О сайте");  
  response.json({
    token: '!!token!!',
    userRole: 'Moderator'
  })
};