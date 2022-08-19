const express = require("express");
const ordersRouter = express.Router();

const ordersController = require("../controllers/ordersController.js");
 
ordersRouter.post("/add", ordersController.add);
ordersRouter.post("/update", ordersController.update);
ordersRouter.post("/delete", ordersController.delete);
ordersRouter.get("/all", ordersController.all);
// ordersRouter.get("/orders", ordersController.orders);
 
module.exports = ordersRouter;