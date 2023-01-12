const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { tokenKey } = require("../config");

const UsersService = require('../services/usersService')

exports.signup = function (req, res) {
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
      // console.log('Step 5')
      if (result.status) {
        res.json({
          user: result.user,
          status: true
        })
      }
    }
  })
}

exports.login = function (request, response) {
  if (request.auth) {
    response.json({
      msg: 'Jast loggin',
      status: false
    })
  }
  User.findOne({
    where: {
      login: request.body.login
    },
  })
    .then(async function (data) {
      if (data === null) {
        response.json({
          msg: 'User not found',
          status: false
        })
      } else {
        const correctPassword = await argon2.verify(data.password, request.body.password);
        if (!correctPassword) {
          response.json({
            msg: 'Incorrect password',
            status: false
          })
        } else {
          let token = jwt.sign({ id: data.id }, tokenKey)
          data.token = token
          await data.save()
          response.json({
            token: token,
            userRole: data.role,
            id: data.id,
            status: true
          })
        }
      }
    }).catch(err => console.log(err));
};

exports.authByToken = (req, res, next) => {
  if (req.headers.authorization) {
    // console.log(req.headers.authorization.split(' ')[1])
    try {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
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
