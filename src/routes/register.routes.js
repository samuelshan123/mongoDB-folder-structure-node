module.exports = app => {
    const registerController = require("../controllers/register/register.controller");

    const router = require("express").Router();
  
    router.get("/reg/ping",(req, res) => {
        res.send('pong')
    })
    

    router.post("/obj/reg",registerController.object_register);
    router.post("/cir/reg",registerController.circle_register);




    app.use("/", router);
  };
  