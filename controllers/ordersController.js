const path = require("path");
const { listeners } = require("process");
const db = require("../db");
const User = db.user;
const Order = db.order;


exports.index = function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
  // response.render("index.html");
};


exports.add = async function (req, res) {
  console.log(req.body)
  Order.create({
    name: req.body.name,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    count: req.body.count,
    note: req.body.note,
    status: req.body.status
  })
    .then((newOrder) => {
      console.log('ok');
      res.json(newOrder)
    })
    .catch((err) => {
      res.json({
        status: false
      })
      console.log(err)
    });

};

exports.update = async function (req, res) {
  console.log(req.body)
  let order = await Order.findByPk(req.body.id);

  if (order.id === null) {
    console.log('item is upsent')
    res.json({
      status: false
    })
  } else {

    Order.update({
      name: req.body.name,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      count: req.body.count,
      note: req.body.note,
      status: req.body.status,
    }, {
      where: {
        id: order.id
      }
    }).then(() => {
      res.json({
        status: true
      })
    }).catch(err => console.log(err));
  }
};

exports.delete = async function (req, res) {
  console.log(req.body)
  // let order = await Order.findByPk(req.body.id);

  // if (order === null) {
  //   console.log('item is upsent')
  //   res.json({
  //     status: false
  //   })
  // } else {

  Order.destroy({
    where: {
      id: req.body.id
    }
  }).then(() => {
    console.log('destroyed')
    res.json({
      status: true
    })
  }).catch(err => console.log(err));

}

// получение данных
exports.all = function (req, res) {
  Order.findAll({ raw: true }).then(data => {
    res.json({
      orders: data
    })
  }).catch(err => console.log(err));
};