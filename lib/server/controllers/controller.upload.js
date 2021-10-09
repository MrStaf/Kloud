// Libraries
const jwt = require("jsonwebtoken");

// Middleware
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verifyToken");

// Models
const Photo = require("../models/models.photo");

const uploadFile = async (req, res) => {
  try {
    await verifyToken(req, res);
    await upload(req, res);

    console.log(req.file);
    if (req.file == undefined) {
      return res.json({
        status: "FAILED",
        message: "You must select a file.",
      });
    }
    const token = req.header("auth-token");
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      const newPhoto = new Photo({
        favorite: false,
        albums: [],
        date: new Date(req.file.uploadDate).getDate(),
        description: "",
        photoID: req.file.id,
        userID: verified,
      });
      newPhoto
        .save()
        .then((response) => {
          res.json({
            status: "SUCCESS",
            message: "Upload successful",
            data: response,
          });
        })
        .catch((err) => {
          console.error(err);
          res.json({
            status: "FAILED",
            message: "An error occurred while saving photo",
          });
        });
      return res.json({
        status: "SUCCESS",
        message: "File has been uploaded.",
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "FAILED",
      message: `Error when trying upload image: ${error}`,
    });
  }
};

module.exports = {
  uploadFile: uploadFile,
};
