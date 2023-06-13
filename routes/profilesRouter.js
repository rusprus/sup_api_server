const express = require("express");
const profilesRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })

const profilesController = require("../controllers/profilesController.js");

profilesRouter.use(function (req, res, next) {
  console.log(req.user)
  console.log('req.user')
  if (req.user) {
    next()
  } else {
    res.json({ msg: 'error', status: false })
  }
});
profilesRouter.post("/add", profilesController.add);
// profilesRouter.post("/update", upload.single('supimg'), profilesController.update);
profilesRouter.post("/update", profilesController.update);
// profilesRouter.post("/delete", profilesController.delete);
profilesRouter.get("/current", profilesController.current);
// profilesRouter.get("/fresh", profilesController.fresh);

module.exports = profilesRouter;