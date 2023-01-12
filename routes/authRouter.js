const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController.js");


authRouter.post("/signup", authController.signup);
authRouter.all("/login", authController.login);


module.exports = authRouter;