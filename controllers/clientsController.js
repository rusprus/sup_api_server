const ClientsService = require('../services/clientsService')


exports.add = async function (req, res) {

  await ClientsService.add(req.body, req.user.id).then(function (result) {
    if (result.status) {
      // console.log(result )
      res.json(result.client)
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.update = async function (req, res) {
  await ClientsService.update(req.body, req.user.id).then((result) => {
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
  ClientsService.delete(req.body, req.user.id).then((result) => {
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
    await ClientsService.all(req.user.id).then((result) => {
      if (result.status) {
        res.json({ clients: result.clients, status: true })
      } else {
        res.json({ status: false })
      }
    }).catch(err => console.log(err));
  }

};