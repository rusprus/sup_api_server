const express = require("express");
const supsRouter = express.Router();
const supsController = require("../controllers/supsController.js");
const { upload } = require("../controllers/commonController.js");


supsRouter.post("/add", supsController.add);
supsRouter.post("/update", supsController.update);
supsRouter.post("/delete", supsController.delete);
supsRouter.get("/all", supsController.all);
supsRouter.post("/img", upload.single('sup_img'), supsController.updateImg);

module.exports = supsRouter;