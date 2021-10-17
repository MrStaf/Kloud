const router = require("express").Router();

// Controllers
const albumController = require("./../controllers/controller.albums");

// Middleware
const verify = require("../middleware/verifyToken");

router.post("/", verify, albumController.addAlbum);
router.delete("/id/:id", verify, albumController.deleteAlbum);

module.exports = router;