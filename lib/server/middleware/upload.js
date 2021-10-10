const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const uuid = require("uuid").v4;

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log(file);
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${uuid()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${uuid()}-${file.originalname}`,
    };
  },


});

module.exports = multer({ storage });
