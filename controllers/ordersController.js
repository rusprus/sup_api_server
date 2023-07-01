const OrdersService = require('../services/ordersService')


exports.add = async function (req, res) {

  await OrdersService.add(req.body, req.user.id).then(function (result) {
    if (result.status) {
      // console.log(result )
      res.json(result.order)
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.update = async function (req, res) {
  await OrdersService.update(req.body, req.user.id).then((result) => {
    if (result.status) {
      res.json({
        status: true
      })
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.del = async function (req, res) {
  OrdersService.delete(req.body, req.user.id).then((result) => {
    if (result.status) {
      res.json({ status: true })
    } else {
      res.json({ status: false })
    }
  }).catch(err => console.log(err));
}

// получение данных
exports.all = async function (req, res) {
  
  if (!req.user) {
    res.json({ message: 'Accsses denied', status: false })
  } else {
    // console.log(req.user)
    await OrdersService.all(req.user.id).then((result) => {
      if (result.status) {
        res.json({ orders: result.orders, status: true })
      } else {
        res.json({ status: false })
      }
    }).catch(err => console.log(err));
  }

};