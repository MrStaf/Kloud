const router = require("express").Router();

// Controllers
const homeController = require("../controllers/controller.home");
const uploadController = require("../controllers/controller.upload");
const getController = require("../controllers/controller.getPhotos");

// Middleware
const verify = require("../middleware/verifyToken");
const upload = require('../middleware/upload');


// Routes
// router.get("/", verify, getController.getAll);
router.post("/upload", verify, upload.single("file"), uploadController.uploadFile);
router.get("/:id", verify, getController.getOneById);

module.exports = router;
