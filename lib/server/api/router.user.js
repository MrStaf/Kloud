const express = require("express");
const router = express.Router();

// Controller
const user = require('./../controllers/controller.users');

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);


module.exports = router;
