const router = require("express").Router();

// Controllers
const uploadController = require("../controllers/controller.upload");
const photosController = require("../controllers/controller.photos");

// Middleware
const verify = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

// Routes
router.post("/upload", verify, upload.single("file"), uploadController.uploadFile);
router.get("/id/:id", photosController.getOneById);
// router.get("/id/:id", verify, photosController.getOneById);
router.get("/meta/:id", verify, photosController.getMetaById);
router.get("/all", verify, photosController.getMultipleByUserId);
router.get("/alb/:id/:start:limit", verify, photosController.getMultipleByAlbumId);
router.get("/fav", verify, photosController.getMultipleByFav);
router.delete("/id/:id", verify, photosController.deletePhoto);
router.patch("/fav/add", verify, photosController.addFav);
router.patch("/fav/remove", verify, photosController.removeFav);
router.patch("/desc", verify, photosController.updatePhoto);
// router.get('/fav/:start:limit', verify, photosController.getMultipleByFavorite);

module.exports = router;
