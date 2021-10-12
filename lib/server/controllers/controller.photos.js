// Libraries
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");


// Models
const Photo = require("../models/models.photo");

const getOneById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    // no id are provided
    res.json({
      status: "FAILED",
      message: "You must provide an id",
    });
  }
  try {
    Photo.find({ _id: id })
      .then((data) => {
        console.log(data);
        if (new mongoose.Types.ObjectId(req.user._id).equals(data[0].userId)) {
          // The user is the owner of this file
          const connect = mongoose.createConnection(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          let gfs;
          connect.once("open", async () => {
            try {
              gfs = Grid(connect.db, mongoose.mongo);
              gfs.collection("photos");
              const file = await gfs.files.findOne({
                filename: data[0].fileName,
              });
              const readStream = gfs.createReadStream(file.filename);
              readStream.pipe(res);
            } catch (error) {
              return res.status(404).json({
                err: "no files exist " + error,
              });
            }
          });
        } else {
          res.status(403).json({
            status: "FAILED",
            message: "Access denied",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAILED",
          message: "Error while trying to get the photo metadata" + err,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: `Error while trying to get photo: ${err}`,
    });
  }
};

const getMultipleByUserId = async (req, res) => {
  const id = req.user._id;
  const start = req.params.start;
  const limit = req.params.limit;
  try {
    Photo.find({ userId: id })
      .sort({ date: "desc" })
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .then((data) => {
        console.log(data);
        data = data.map((itm) => {
          return itm.photoId;
        });
        res.json({
          status: "SUCCESS",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAILED",
          message: "Error while trying to get the photo metadata" + err,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: `Error while trying to get photo: ${err}`,
    });
  }
};

const getMultipleByAlbumId = async (req, res) => {
  const id = req.user._id;
  const album_id = req.params.id;
  const start = req.params.start;
  const limit = req.params.limit;
  try {
    Photo.find({ userId: id, albums : { $elemMatch : { albumId : album_id } } } )
      .sort({ date: "desc" })
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .then((data) => {
        console.log(data);
        data = data.map((itm) => {
          return itm.photoId;
        });
        res.json({
          status: "SUCCESS",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAILED",
          message: "Error while trying to get the photo metadata" + err,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: `Error while trying to get photo: ${err}`,
    });
  }
};

module.exports = {
  getOneById,
  getMultipleByUserId,
  getMultipleByAlbumId,
};
