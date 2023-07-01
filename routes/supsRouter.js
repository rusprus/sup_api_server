const express = require("express");
const supsRouter = express.Router();
const supsController = require("../controllers/supsController.js");
const { upload } = require("../controllers/commonController.js");
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/' + req.user.login)
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//   }
// })

// const upload = multer({ storage: storage })

supsRouter.post("/add", supsController.add);
supsRouter.post("/update", supsController.update);
supsRouter.post("/delete", supsController.delete);
supsRouter.get("/all", supsController.all);
supsRouter.post("/img", upload.single('img'), supsController.updateImg);

module.exports = supsRouter;