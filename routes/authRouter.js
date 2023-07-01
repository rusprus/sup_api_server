const express = require("express");
const authRouter = express.Router();

const { signup, login, checkUid, updatePass } = require("../controllers/authController.js");


authRouter.post("/signup", signup);
authRouter.all("/login", login);
authRouter.all("/update", checkUid, updatePass);


module.exports = authRouter;