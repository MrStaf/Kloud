// Middleware
const upload = require("../middleware/upload");

// Models
const Photo = require("../models/models.photo");

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);
    const photoId = req.file.id.toString();
    const userId = req.user._id;
    const date = new Date(req.file.uploadDate).toString();
    const description = req.body.description;
    const fileName = req.file.originalname;
    if (req.file == undefined) {
      return res.json({
        status: "FAILED",
        message: "You must select a file.",
      });
    }
    try {
      const newPhoto = new Photo({
        favorite: false,
        albums: [],
        date,
        description,
        photoId,
        userId,
        fileName,
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
