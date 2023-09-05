const express = require("express");
const clientsRouter = express.Router();

const { add, update, del, all } = require("../controllers/clientsController.js");

clientsRouter.post("/add", add);
clientsRouter.post("/update", update);
clientsRouter.post("/delete", del);
clientsRouter.get("/all", all);

module.exports = clientsRouter;