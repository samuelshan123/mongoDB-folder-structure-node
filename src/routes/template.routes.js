module.exports = app => {
    const router = require("express").Router();

    exports.home = router.get('/home', (req, res) => {
        res.render('index')
    })


    app.use("/", router);
};