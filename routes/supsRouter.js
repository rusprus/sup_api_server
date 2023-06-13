const express = require("express");
const supsRouter = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
  const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })

const supsController = require("../controllers/supsController.js");

supsRouter.use(function (req, res, next) {
    console.log(req.user)
    console.log('req.user')
        if (req.user) {
            next()
        } else {
            res.json({ msg: 'error', status: false })
        }
});
supsRouter.post("/add", supsController.add);
supsRouter.post("/update", upload.single('supimg'), supsController.update);
supsRouter.post("/delete", supsController.delete);
supsRouter.get("/all", supsController.all);
// supsRouter.get("/fresh", supsController.fresh);

module.exports = supsRouter;