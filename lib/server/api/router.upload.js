const router = require("express").Router();

// Controllers
const homeController = require("../controllers/controller.home");
const uploadController = require("../controllers/controller.upload");

// Middleware
const verify = require("../middleware/verifyToken");


// Routes
router.get("/", homeController.getHome);
router.post("/upload", verify, uploadController.uploadFile);

module.exports = router;
