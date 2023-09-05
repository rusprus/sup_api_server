var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const http = require('http');
const  chat  = require("./chat/index.js");
const { Server } = require("socket.io");

var indexRouter = require("./routes/indexRouter.js");
var ordersRouter = require("./routes/ordersRouter.js");
var clientsRouter = require("./routes/clientsRouter.js");
var supsRouter = require("./routes/supsRouter.js");
var authRouter = require("./routes/authRouter.js");
var profilesRouter = require("./routes/profilesRouter.js");
var { authByToken, checkUid } = require("./controllers/authController")
var { errorHandler } = require("./controllers/commonController.js")

var app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

chat(io)

process.env.VUE_APP_BASE_URL = 'http://api.spbsupboard.ru'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, '/uploads')));

app.use(authByToken)

app.use('/orders', checkUid, ordersRouter);
app.use('/clients', checkUid, clientsRouter);
app.use('/sups', checkUid, supsRouter);
app.use('/auth', authRouter);
app.use('/profiles', checkUid, profilesRouter);
app.use('/uploads', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`server started on port $(PORT)`))

// module.exports = server;
