// Models
const Photo = require("../models/models.photo");

const uploadFile = async (req, res) => {
  try {
    // console.log(req.file);
    const fileName = req.file.filename;
    const userId = req.user._id;
    const photoId = req.file.id;
    const date = new Date(req.file.uploadDate).toString();
    const description = req.body.description;
    const mimeType = req.file.mimetype;
    if (req.file == undefined) {
      return res.status(400).json({
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
        userId,
        fileName,
        photoId,
        mimeType,
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
          res.status(400).json({
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
    return res.status(400).json({
      status: "FAILED",
      message: `Error when trying upload image: ${error}`,
    });
  }
};

module.exports = {
  uploadFile: uploadFile,
};
