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
router.get("/", verify, albumController.getMultipleAlbums);
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
router.patch("/add", verify, albumController.addPhotoAlbum);
router.patch("/remove", verify, albumController.removePhotoAlbum);
router.patch("/desc", verify, albumController.updateAlbumName);

module.exports = router;
