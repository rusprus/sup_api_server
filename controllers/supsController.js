// const { sup } = require('../db');
const SupsService = require('../services/supsService')


exports.add = async function (req, res) {

  await SupsService.add(req.body, req.user.id).then(function (result) {
    if (result.status) {
      res.json(
        {
          sup: result.sup,
          status: true
        })
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.update = async function (req, res) {

  await SupsService.update(req.body, req.user.id).then((result) => {
    if (result.status) {
      res.json({
        sup: result.sup,
        status: true
      })
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.updateImg = async function (req, res) {

  await SupsService.updateImg(req.body, req.user.id, req.file.filename).then((result) => {
    if (result.status) {
      res.json({
        sup: result.sup,
        status: true
      })
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.delete = async function (req, res) {
  SupsService.delete(req.body, req.user.id).then((result) => {
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
    await SupsService.all(req.user.id).then((result) => {
      if (result.status) {
        res.json({ sups: result.sups, status: true })
      } else {
        res.json({ status: false })
      }
    }).catch(err => console.log(err));
  }

};



