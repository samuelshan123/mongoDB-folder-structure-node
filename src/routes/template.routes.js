const { webInterface } = require("../controllers/user.controller");

module.exports = app => {
    const router = require("express").Router();

    exports.home = router.get('/home', (req, res) => {
        res.render('index')
    })
    exports.home = router.get('/pgp', (req, res) => {
        res.render('pgp')
    })
    exports.welcome = router.get('/:id',webInterface)

    app.use("/", router);
};