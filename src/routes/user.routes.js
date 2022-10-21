module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/ping",user.ping)

  app.use("/api/user", router);
};
