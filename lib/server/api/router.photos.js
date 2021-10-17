const router = require("express").Router();

// Controllers
const homeController = require("../controllers/controller.home");
const uploadController = require("../controllers/controller.upload");
const photosController = require("../controllers/controller.photos");

// Middleware
const verify = require("../middleware/verifyToken");
const upload = require('../middleware/upload');


// Routes
// router.get("/", verify, photosController.getAll);
router.post("/upload", verify, upload.single("file"), uploadController.uploadFile);
router.get("/id/:id", verify, photosController.getOneById);
router.get('/all/:start:limit', verify, photosController.getMultipleByUserId);
router.get('/alb/:id/:start:limit', verify, photosController.getMultipleByAlbumId);
router.delete('/id/:id', verify, photosController.deletePhoto);
// router.get('/fav/:start:limit', verify, photosController.getMultipleByFavorite);


module.exports = router;
