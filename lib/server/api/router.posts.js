const router = require("express").Router();
const verify = require("../middleware/verifyToken");

const User = require("../models/models.user");

router.get("/", verify, (req, res) => {
  User.find({ _id: req.user }).then((data) => {
    res.json({
      status: "SUCCESS",
      data: data,
    });
  });
});

module.exports = router;
