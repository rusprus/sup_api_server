
const multer = require('multer');


// error handler
exports.errorHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    // console.log(err);
  };

//----------- multer-----------------------
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/' + req.user.login)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
  exports.upload = multer({ storage: storage })
// ------------------------------------------