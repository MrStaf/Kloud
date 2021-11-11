const router = require("express").Router();

// Controllers
const albumController = require("./../controllers/controller.albums");

// Middleware
const verify = require("../middleware/verifyToken");

router.get("/", verify, albumController.getAlbum);
router.post("/", verify, albumController.addAlbum);
router.delete("/id/:id", verify, albumController.deleteAlbum);
router.patch("/add", verify, albumController.addPhotoAlbum);
router.patch("/remove", verify, albumController.removePhotoAlbum);
router.patch("/desc", verify, albumController.updateAlbumName);

module.exports = router;