const express = require("express");
const ordersRouter = express.Router();

const { add, update, del, all } = require("../controllers/ordersController.js");

ordersRouter.post("/add", add);
ordersRouter.post("/update", update);
ordersRouter.post("/delete", del);
ordersRouter.get("/all", all);

module.exports = ordersRouter;