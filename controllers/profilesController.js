const UsersService = require('../services/usersService')


exports.add = async function (req, res) {

  await UsersService.add(req.body, req.user.id).then(function (result) {
    if (result.status) {
      res.json(result.user)
    } else {
      res.json({
        status: false
      })
    }
  })
};

exports.update = async function (req, res) {

  await UsersService.update(req.body, req.user.id).then((result) => {
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

exports.updateImg = async function (req, res) {

  await UsersService.updateImg(req.user.id, req.file.filename).then((result) => {
    if (result.status) {
      res.json({
        photo: result.photo,
        status: true
      })
    } else {
      res.json({
        status: false
      })
    }
  })
};

// получение данных
exports.current = async function (req, res) {

  if (!req.user) {
    res.json({ message: 'Accsses denied', status: false })
  } else {
    await UsersService.getById(req.user.id).then((result) => {
      if (result.status) {
        let profile = {
          id: result.user.id,
          age: result.user.age,
          email:result.user.email,
          name:result.user.name,
          login:result.user.login,
          photo:result.user.photo,
          role:result.user.role,
          status:result.user.status,
          note_eml:result.user.note_eml,
          note_tlg:result.user.note_tlg,

        }
        res.json({ profile: profile, status: true })
      } else {
        res.json({ status: false })
      }
    }).catch(err => console.log(err));
  }

};
