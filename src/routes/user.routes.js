module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/ping",user.ping)
  router.post("/encryptFormData",user.encryptFormData)
router.get("/findCircles",user.findCircles)

  app.use("/", router);
};
