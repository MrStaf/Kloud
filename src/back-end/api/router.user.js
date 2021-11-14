const express = require("express");
const router = express.Router();

// Controller
const user = require("./../controllers/controller.users");

// Middleware
const verify = require("./../middleware/verifyToken");

/**
 * 
 * @api {GET} /user/ Get user information
 * @apiName getUser
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiHeader  {String} auth-token jwt token
 * 
 * @apiSuccess {String} status SUCCESS
 * @apiSuccess {String} message User successfully found
 * @apiSuccess {String} data.firstName First Name 
 * @apiSuccess {String} data.lastName Last Name
 * @apiSuccess {String} data.email Email
 * @apiSuccess {String} data.photoToken Token for later use (encryption)
 * 
 * @apiSuccessExample {Object} Success-Response:
 *  {
 *      "status": "SUCCESS",
 *      "message": "User successfully found",
 *      "data": {
 *          "firstName": "MichMich",
 *          "lastName": "Dupond",
 *          "email": "some@email.com",
 *          "photoToken": "8f12e418-30b1-40b2-8f12-c574fa723493"
 *      }
 *  }
 * 
 * 
 */
router.get("/", verify, user.getUser);
/**
 * 
 * @api {POST} /user/signup Register a user
 * @apiName registerUser
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * @apiBody {String} firstName First Name
 * @apiBody {String} lastName Last Name
 * @apiBody {String} email Email
 * @apiBody {String} password Password
 * 
 * @apiSuccess {String} status SUCCESS
 * @apiSuccess {String} message Sign up successful
 * @apiSuccess {String} token JWT token 
 * @apiSuccess {String} data._id User id
 * @apiSuccess {String} data.fistName Last Name
 * @apiSuccess {String} data.lastName Last Name
 * @apiSuccess {String} data.email Email
 * @apiSuccess {String} data.password Hash of the password
 * @apiSuccess {String} data.photoToken Token for later use (encryption)
 * @apiSuccess {Number} data.__v Version of the document
 * 
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 *  {
 *      "status": "SUCCESS",
 *      "message": "Sign up successful",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX9JVC.eyJfaWQiOiI2MTdhNmFjYzE0ODAwMzMzMzUyMGUwNGYiLCJpYXQiOjE2MzY5MjcxNjB9.9TXWZZGyK82UAfkFxqfuy5YNfv7G_cknUwPl0Qe1f5g",
 *      "data": [
 *          {
 *          "_id": "617a6acc148003333520e04g",
 *          "firstName": "MichMich",
 *          "lastName": "Dupond",
 *          "email": "some@email.com",
 *          "password": "$2b$10$1255NmzK9ciPFHqcd8B6h.TK.ObsOiqsWIV0C5HPflhlB7xLyJqAG",
 *          "photoToken": "8f12e418-30b1-40b2-8f12-c574fa723493",
 *          "__v": 0
 *          }
 *      ]
 *  }
 * 
 * 
 */
router.post("/signup", user.signUp);
router.patch("/", verify, user.updateUser);
router.post("/signin", user.signIn);
router.delete("/", verify, user.deleteUser);

module.exports = router;
