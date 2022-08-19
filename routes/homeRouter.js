const express = require("express");
const homeRouter = express.Router();

const homeController = require("../controllers/homeController.js");
 
homeRouter.get("/t", homeController.index);
// homeRouter.get("/calendar", homeController.calendar);
// homeRouter.get("/w", homeController.index);
homeRouter.get("/about", homeController.about);
homeRouter.get("/orders", homeController.orders);
homeRouter.post("/login", homeController.login);
homeRouter.get("/login", homeController.login);
 
module.exports = homeRouter;