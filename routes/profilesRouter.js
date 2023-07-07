const express = require("express");
const profilesRouter = express.Router();
const profilesController = require("../controllers/profilesController.js");
const { upload } = require("../controllers/commonController.js");


profilesRouter.post("/add", profilesController.add);
profilesRouter.post("/update", profilesController.update);
profilesRouter.get("/current", profilesController.current);
profilesRouter.post("/img", upload.single('profile_img'), profilesController.updateImg);


module.exports = profilesRouter;