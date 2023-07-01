var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


// var indexRouter = require('./routes/index');
var indexRouter = require("./routes/indexRouter.js");
var ordersRouter = require("./routes/ordersRouter.js");
var supsRouter = require("./routes/supsRouter.js");
var authRouter = require("./routes/authRouter.js");
var profilesRouter = require("./routes/profilesRouter.js");
var { authByToken, checkUid } = require("./controllers/authController")
var { errorHandler } = require("./controllers/commonController.js")

var app = express();

process.env.VUE_APP_BASE_URL = 'http://api.spbsupboard.ru'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://spbsupboard.ru");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, '/uploads')));

app.use(authByToken)

app.use('/orders', checkUid, ordersRouter);
app.use('/sups', checkUid, supsRouter);
app.use('/auth', authRouter);
app.use('/profiles', checkUid, profilesRouter);
app.use('/uploads', indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler)

module.exports = app;
