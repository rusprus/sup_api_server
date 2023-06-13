const SupsService = require('../services/supsService')


exports.add = async function (req, res) {

  await SupsService.add(req.body, req.user.id).then(function (result) {
    if (result.status) {
      // console.log(result )
      res.json(result.sup)
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.update = async function (req, res) {
  // console.log(req.file.fieldname)
  // console.log(req.file.mimetype)
  let name = 'uploads/' + req.file.filename 
  await SupsService.update(req.body, req.user.id, name).then((result) => {
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

exports.fresh = async function (req, res) {

  // res.json(result.sup)

  // await SupsService.add(req.body, req.user.id).then(function (result) {
  //   if (result.status) {
  //     // console.log(result )
  //     res.json(result.sup)
  //   } else {
  //     res.json({
  //       status: false
  //     })
  //   }
  // })
};