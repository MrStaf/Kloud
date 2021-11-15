const router = require("express").Router();

// Controllers
const uploadController = require("../controllers/controller.upload");
const photosController = require("../controllers/controller.photos");

// Middleware
const verify = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

// Routes
/**
 * 
 * @api {POST} /photo/upload Upload photo
 * @apiName uploadPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiBody {File} file Photo (png / jpeg / jpg)
 * @apiBody {String} description Description of the Photo
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Upload successful
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {String[]} data.albums Array of albums ID 
 * @apiSuccess (200) {String} data._id Id of the photo
 * @apiSuccess (200) {Boolean} data.favorite Favorite state
 * @apiSuccess (200) {String} data.description Description of the Photo
 * @apiSuccess (200) {String} data.date Date of upload
 * @apiSuccess (200) {String} data.fileName Name of the file
 * @apiSuccess (200) {String} data.photoId ID of the photo metadata
 * @apiSuccess (200) {String} data.mimeType type of the photo
 * 
 * 
 */
router.post("/upload", verify, upload.single("file"), uploadController.uploadFile);
/**
 * 
 * @api {GET} /photo/id/:id Get photo
 * @apiName getPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} id id of the photo
 * 
 * @apiSuccess (200) {PipeStream} _ The photo
 * 
 * 
 */
router.get("/id/:id", photosController.getOneById);
/**
 * 
 * @api {GET} /photos/meta/:id Get metadata of a photo
 * @apiName getMetaPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} id Photo id
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Metadata successfully get
 * @apiSuccess (200) {Object} data
 * @apiSuccess (200) {String[]} data.albums Array of albums ID 
 * @apiSuccess (200) {String} data._id Id of the photo
 * @apiSuccess (200) {Boolean} data.favorite Favorite state
 * @apiSuccess (200) {String} data.description Description of the Photo
 * @apiSuccess (200) {String} data.date Date of upload
 * @apiSuccess (200) {String} data.fileName Name of the file
 * @apiSuccess (200) {String} data.photoId ID of the photo metadata
 * @apiSuccess (200) {String} data.mimeType type of the photo
 * 
 * 
 */
router.get("/meta/:id", verify, photosController.getMetaById);
/**
 * 
 * @api {GET} /photos/all Get all photos id
 * @apiName getAllPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Metadata successfully get
 * @apiSuccess (200) {String[]} data Array of photo id
 * 
 * 
 */
router.get("/all", verify, photosController.getMultipleByUserId);
/**
 * 
 * @api {GET} /photos/alb/:id Get some photos from album id
 * @apiName getAlbumPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} id Album id
 * @apiParam {String} start start index
 * @apiParam {String} limit number of elements returned
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Metadata successfully get
 * @apiSuccess (200) {String[]} data Array of photo id
 * 
 * 
 */
router.get("/alb/:id", verify, photosController.getMultipleByAlbumId);
/**
 * 
 * @api {GET} /photos/fav Get some photos from favorite
 * @apiName getFavPhotos
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} start start index
 * @apiParam {String} limit number of elements returned
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String[]} data Array of photo id
 * 
 * 
 */
router.get("/fav", verify, photosController.getMultipleByFav);
/**
 * 
 * @api {DELETE} /photos/id/:id Delete photo
 * @apiName deletePhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} id Photo id
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message File successfully deleted.
 * 
 * 
 */
router.delete("/id/:id", verify, photosController.deletePhoto);
/**
 * 
 * @api {PATCH} /photos/fav/add Add photo to favorite
 * @apiName addFavPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiBody {String} photoId Photo id
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Photo successfully added to favorite
 * 
 * 
 */
router.patch("/fav/add", verify, photosController.addFav);
/**
 * 
 * @api {PATCH} /photos/fav/remove Remove photo to favorite
 * @apiName removeFavPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiBody {String} photoId Photo id
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Photo successfully removed to favorite
 * 
 * 
 */
router.patch("/fav/remove", verify, photosController.removeFav);
/**
 * 
 * @api {PATCH} /photos/desc Change photo description
 * @apiName changeDescPhoto
 * @apiGroup Photos
 * @apiVersion  1.0.0
 * 
 * @apiBody {String} photoId Photo id
 * @apiBody {String} description New description
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Description successfully changed
 * 
 * 
 */
router.patch("/desc", verify, photosController.updatePhoto);

module.exports = router;
