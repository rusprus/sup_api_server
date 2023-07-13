const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { tokenKey } = require("../config");

const UsersService = require('../services/usersService')
const validator = require('validator');


exports.signup = function (req, res) {

  if (validator.isEmpty(req.body.login) || validator.isEmpty(req.body.password) ||
    validator.isEmpty(req.body.email || validator.isEmpty(req.body.name))) {
    res.json({
      status: false
    })
    next()
  }
  UsersService.getByLogin(req.body.login).then(async (data) => {
    if (data.status) {
      res.json({
        status: false
      })
    } else {
      let user = req.body
      const hash = await argon2.hash(req.body.password);
      user['hash'] = hash

      let result = await UsersService.add(user)
      if (result.status) {
        res.json({
          user: result.user,
          status: true
        })
      }
    }
  })
}

exports.login = function (req, res) {
  if (validator.isEmpty(req.body.login) || validator.isEmpty(req.body.password)) {
    res.json({
      status: false
    })
    next()
  }

  if (req.auth) {
    res.json({
      msg: 'Just logged',
      status: false
    })
  }
  User.findOne({
    where: {
      login: req.body.login
    },
  })
    .then(async function (data) {
      if (data === null) {
        res.json({
          msg: 'User not found',
          status: false
        })
      } else {
        const correctPassword = await argon2.verify(data.password, req.body.password);
        if (!correctPassword) {
          res.json({
            msg: 'Incorrect password',
            status: false
          })
        } else {
          let token = jwt.sign({ id: data.id }, tokenKey)
          data.token = token
          await data.save()
          // console.log('Сохраненный токен ' + data.token)
          res.json({
            token: token,
            userRole: data.role,
            id: data.id,
            status: true
          })
        }
      }
    }).catch(err => console.log(err));
};


exports.updatePass = async function (req, res) {

  if (req.user.hasOwnProperty('id') && req.body.hasOwnProperty('oldPass') && req.body.hasOwnProperty('newPass')) {

    let user = await UsersService.getById(req.user.id);

    const correctPassword = await argon2.verify(user.user.password, req.body.oldPass);
    if (correctPassword) {

      user.user.password = await argon2.hash(req.body.newPass);

      const result = await UsersService.update(user.user)


      res.json({ status: result.status })

    } else {
      res.json({ status: false })
    }

  } else {
    res.json({ status: false })
  }
}




exports.authByToken = (req, res, next) => {
  if (req.headers.xauthorization) {
    try {

      console.log('req.headers.xauthorization')
      console.log(req.headers.xauthorization)

      jwt.verify(
        req.headers.xauthorization.split(',')[0].split(' ')[1],
        tokenKey,
        async (err, payload) => {
          if (err) next()
          else if (payload) {
            const result = await UsersService.getById(payload.id)
            req.user = result.user
            next()
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  } else {
    next()
  }
}

exports.checkUid = function (req, res, next) {

  if (req.user) {
    next()
  } else {
    res.json({ msg: 'error', status: false })
  }
};
