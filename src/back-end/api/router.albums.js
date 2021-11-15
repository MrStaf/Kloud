const router = require("express").Router();

// Controllers
const albumController = require("./../controllers/controller.albums");

// Middleware
const verify = require("../middleware/verifyToken");

/**
 *
 * @api {GET} /album/ Get all albums id
 * @apiName getAlbums
 * @apiGroup Albums
 * @apiVersion  1.0.0
 *
 *
 * @apiHeader {String} auth-token jwt token
 *
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Album successfully got
 * @apiSuccess (200) {Object[]} data array of Albums id
 * @apiSuccess (200) {String} data.userId User id
 * @apiSuccess (200) {String} data.name Name of the album
 * @apiSuccess (200) {Date} data.date date of creation
 * 
 * @apiSuccessExample {Object} Success-Response:
 * {
 *      "status": "SUCCESS",
 *      "message": "Album successfully got",
 *      "data": [
 *          {
 *          "_id": "617f236b68ca087c3865947b",
 *          "userId": "617a6acc148003333520e04f",
 *          "name": "new album 2",
 *          "date": "2021-10-31T23:14:51.000Z",
 *          "__v": 0
 *          },
 *          {
 *          "_id": "617f236768ca087c38659479",
 *          "userId": "617a6acc148003333520e04f",
 *          "name": "new album",
 *          "date": "2021-10-31T23:14:47.000Z",
 *          "__v": 0
 *          },
 *          {
 *          "_id": "617f2100ea07b57049ee5347",
 *          "userId": "617a6acc148003333520e04f",
 *          "date": "2021-10-31T23:04:32.000Z",
 *          "__v": 0,
 *          "name": "Test"
 *          }
 *      ]
 * } 
 *
 *
 */
router.get("/", verify, albumController.getAlbums);
/**
 *
 * @api {GET} /album/id/ Get album information
 * @apiName getAlbum
 * @apiGroup Albums
 * @apiVersion  1.0.0
 *
 * @apiParam {String} id Album id
 *
 * @apiHeader {String} auth-token jwt token
 *
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Album successfully got
 * @apiSuccess (200) {Object} data data
 * @apiSuccess (200) {String} data._id Album id
 * @apiSuccess (200) {String} data.userId Owner user id
 * @apiSuccess (200) {String} data.name Name of the album
 * @apiSuccess (200) {Date} data.date date of creation
 * 
 * @apiSuccessExample {Object} Success-Response:
 *  {
 *  "status": "SUCCESS",
 *  "message": "Album successfully got",
 *  "data": {
 *      "_id": "6191a456494f0c1a0849b818",
 *      "userId": "6190feec1d486c075a8dd6d7",
 *      "name": "Some album",
 *      "date": "2021-11-15T00:05:42.000Z",
 *      "__v": 0
 *  }
 *  }
 *
 *
 */
router.get("/id/:id", verify, albumController.getAlbum);
/**
 *
 * @api {GET} /album/alb/ Get multiple albums
 * @apiName getMultipleAlbum
 * @apiGroup Albums
 * @apiVersion  1.0.0
 *
 * @apiParam {String} start start index
 * @apiParam {String} limit number of elements returned
 *
 * @apiHeader {String} auth-token jwt token
 *
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Albums successfully got
 * @apiSuccess (200) {Object[]} data array of Albums id
 * @apiSuccess (200) {String} data.userId User id
 * @apiSuccess (200) {String} data.name Name of the album
 * @apiSuccess (200) {Date} data.date date of creation
 * 
 * @apiSuccessExample {Object} Success-Response:
 *  {
 *  "status": "SUCCESS",
 *  "message": "Albums successfully got",
 *  "data": [
 *      {
 *          "_id": "6191a456494f0c1a0849b818",
 *          "userId": "6190feec1d486c075a8dd6d7",
 *          "name": "Some album",
 *          "date": "2021-11-15T00:05:42.000Z",
 *          "__v": 0
 *      }
 *  ]
 *  }
 *
 *
 */
router.get("/alb/", verify, albumController.getMultipleAlbums);
/**
 * 
 * @api {POST} /album Create an album
 * @apiName createAlbum
 * @apiGroup Albums
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiBody {String} name Name of the album
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Album created successfully
 * @apiSuccess (200) {Object} data Contain Album information
 * @apiSuccess (200) {String} data._id 
 * @apiSuccess (200) {String} data.name Name of the album
 * @apiSuccess (200) {Date} data.date Date of creation
 * 
 * 
 */
router.post("/", verify, albumController.addAlbum);

/**
 * 
 * @api {DELETE} /album/id/:id Delete one album
 * @apiName delAlbums
 * @apiGroup Albums
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} auth-token jwt token
 * 
 * @apiParam  {String} id album id
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Album successfully deleted
 * 
 * @apiSuccessExample {Object} Success-Response:
 * {
 *      "status": "SUCCESS",
 *      "message": "Album successfully deleted"
 * }
 * 
 * 
 */
router.delete("/id/:id", verify, albumController.deleteAlbum);
/**
 * 
 * @api {PATCH} /album/add Add photo to album
 * @apiName addPhotoAlbum
 * @apiGroup Albums
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiBody {String} photoId Id of the photo
 * @apiBody {String} albumId Id of the album
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Photo successfully added to album
 * 
 * 
 * 
 */
router.patch("/add", verify, albumController.addPhotoAlbum);
/**
 * 
 * @api {PATCH} /album/remove Remove photo to album
 * @apiName removePhotoAlbum
 * @apiGroup Albums
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiBody {String} photoId Id of the photo
 * @apiBody {String} albumId Id of the album
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Photo successfully removed to album
 * 
 * 
 * 
 */
router.patch("/remove", verify, albumController.removePhotoAlbum);
/**
 * 
 * @api {PATCH} /album/name Update album name
 * @apiName updateAlbumName
 * @apiGroup Albums
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} auth-token JWT token
 * 
 * @apiBody {String} name New name of the album
 * @apiBody {String} albumId Id of the album
 * 
 * @apiSuccess (200) {String} status SUCCESS
 * @apiSuccess (200) {String} message Album name successfully changed
 * @apiSuccess (200) {Object} data Contain Album information
 * @apiSuccess (200) {String} data._id 
 * @apiSuccess (200) {String} data.name Name of the album
 * @apiSuccess (200) {Date} data.date Date of creation
 * 
 */
router.patch("/name", verify, albumController.updateAlbumName);

module.exports = router;
