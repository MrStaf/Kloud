const express = require("express");
const router = express.Router();

// Controller
const user = require("./../controllers/controller.users");

// Middleware
const verify = require("./../middleware/verifyToken");

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);
router.delete("/", verify, user.deleteUser);

module.exports = router;
