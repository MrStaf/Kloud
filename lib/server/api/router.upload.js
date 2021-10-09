const router = require("express").Router();

// Controllers
const homeController = require("../controllers/controller.home");
const uploadController = require("../controllers/controller.upload");

// Routes
router.get("/", homeController.getHome);
router.post("/", uploadController.uploadFile);

module.exports = router;
