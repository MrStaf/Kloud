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
                status: "FAILED",
                message: "no files exist " + error,
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
          return itm._id;
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
    Photo.find({ userId: id, albums: { $elemMatch: { albumId: album_id } } })
      .sort({ date: "desc" })
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .then((data) => {
        console.log(data);
        data = data.map((itm) => {
          return itm._id;
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

const deletePhoto = async (req, res) => {
  const uid = req.user._id;
  const pid = req.params.id;
  if (!pid) {
    return res.status(400).json({
      status: "FAILED",
      message: "You must provide an id.",
    });
  }
  Photo.findById(pid)
    .then((data) => {
      console.log(data);
      console.log(uid);
      if (uid == data.userId) {
        // TODO: refactor code for only one connection
        // The user is the owner of this file
        const connect = mongoose.createConnection(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        let gfs;
        connect.once("open", async () => {
          try {
            gfs = Grid(connect.db, mongoose.mongo);
            const file = await gfs.collection("photos").deleteOne({
              _id: data.photoId,
            });
            try {
              // TODO: refactor this shit
              (await connect).db.collection("photos.chunks").deleteMany({
                files_id: data.photoId,
              });
            } catch (err) {
              return res.status(400).json({
                status: "FAILED",
                message: "Failed to delete chunks.",
              });
            }
            console.log(file.deletedCount);
            Photo.deleteOne({ _id: pid })
              .then(() => {
                return res.json({
                  status: "SUCCESS",
                  message: "File successfully deleted.",
                });
              })
              .catch(() => {
                return res.status(400).json({
                  status: "FAILED",
                  message: "Error while deleting photo data",
                });
              });
          } catch (error) {
            return res.status(404).json({
              status: "FAILED",
              message: "No files exist " + error,
            });
          }
        });
      } else {
        return res.status(403).json({
          status: "FAILED",
          message: "Access denied",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "FAILED",
        message: "Error while getting photo metadata." + err,
      });
    });
};

const addFav = async (req, res) => {
  const uid = req.user._id;
  const pid = req.body.photoId;
  if (!pid) {
    return res.status(400).json({
      status: "FAILED",
      message: "You must provide an id.",
    });
  }
  try {
    let photo = await Photo.findById(pid);
    if (photo) {
      // Photo exist
      if (photo.userId == uid) {
        // User own the photo
        console.log(photo.favorite)
        if (!photo.favorite) {
          try {
            await Photo.updateOne({ _id: pid }, {
              favorite: true,
            });
            return res.json({
              status: "SUCCESS",
              message: "Photo successfully added to favorite"
            })
          } catch (error) {
            return res.status(400).json({
              status: "FAILED",
              message: "Photo not added to favorite"
            })
          }
        } else {
          return res.status(400).json({
            status: "FAILED",
            message: "Photo already favorite",
          });
        }
      }
    } else {
      return res.status(400).json({
        status: "FAILED",
        message: "Photo does not exist",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "FAILED",
      message: "Error: " + error,
    });
  }
};

module.exports = {
  getOneById,
  getMultipleByUserId,
  getMultipleByAlbumId,
  deletePhoto,
  addFav,
};
