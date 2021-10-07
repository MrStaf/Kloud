const router = require("express").Router();
const verify = require("./verifyToken");

const User = require("./../models/user");

router.get("/", verify, (req, res) => {
  User.find({ _id: req.user }).then((data) => {
    res.json({
      status: "SUCCESS",
      data: data,
    });
  });
});

module.exports = router;
