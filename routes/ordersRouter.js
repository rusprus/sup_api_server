const express = require("express");
const ordersRouter = express.Router();

const ordersController = require("../controllers/ordersController.js");

ordersRouter.use(function (req, res, next) {
    console.log('ordersRouter')
    console.log('req.user')
        if (req.user) {
            next()
        } else {
            res.json({ msg: 'error', status: false })
        }
});
ordersRouter.post("/add", ordersController.add);
ordersRouter.post("/update", ordersController.update);
ordersRouter.post("/delete", ordersController.delete);
ordersRouter.get("/all", ordersController.all);

module.exports = ordersRouter;