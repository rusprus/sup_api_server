const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController.js");


authRouter.post("/signup", authController.signup);
authRouter.all("/login", authController.login);
authRouter.all("/update", authController.updatePass);


module.exports = authRouter;