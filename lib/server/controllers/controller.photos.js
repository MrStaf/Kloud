// Libraries
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

// Models
const Photo = require("../models/models.photo");

const getMetaById = async (req, res) => {
  const pid = req.params.id;
  const uid = req.user._id;
  if (!pid) {
    // no id are provided
    res.json({
      status: "FAILED",
      message: "You must provide an id",
    });
  }
  try {
    const photo = await Photo.findById(pid);
    if (photo.userId == uid) {
      // User is the owner of this file
      return res.json({
        status: "SUCCESS",
        message: "Metadata successfully get",
        data: photo,
      });
    } else {
      return res.status(403).json({
        status: "FAILED",
        message: "Access denied",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "FAILED",
      message: "Error: " + error,
    });
  }
};

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
        // console.log(data);
        // if (new mongoose.Types.ObjectId(req.user._id).equals(data[0].userId)) {
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
              _id: data[0].photoId,
            });
            // console.log(file);
            const readStream = gfs.createReadStream({
              _id: file._id,
            });
            readStream.pipe(res);
            // const bufs = [];
            // readStream.on("data", function (chunk) {
            //   bufs.push(chunk);
            // });
            // readStream.on("end", function () {
            //   const fbuf = Buffer.concat(bufs);
            //   const base64 = fbuf.toString("base64");
            //   res.status(200).send(`data:${file.contentType};base64,${base64}`);
            // });
            // connect.close();
          } catch (error) {
            return res.status(404).json({
              status: "FAILED",
              message: "no files exist " + error,
            });
          }
        });
        // } else {
        //   res.status(403).json({
        //     status: "FAILED",
        //     message: "Access denied",
        //   });
        // }
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
  const start = req.query.start;
  const limit = req.query.limit;
  try {
    Photo.find({ userId: id })
      .sort({ date: -1 })
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .then((data) => {
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
  const start = req.query.start;
  const limit = req.query.limit;
  try {
    Photo.find({ userId: id, albums: { $elemMatch: { albumId: album_id } } })
      .sort({ date: -1 })
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
        console.log(photo.favorite);
        if (!photo.favorite) {
          try {
            await Photo.updateOne(
              { _id: pid },
              {
                favorite: true,
              },
            );
            return res.json({
              status: "SUCCESS",
              message: "Photo successfully added to favorite",
            });
          } catch (error) {
            return res.status(400).json({
              status: "FAILED",
              message: "Photo not added to favorite",
            });
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

const removeFav = async (req, res) => {
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
        console.log(photo.favorite);
        if (photo.favorite) {
          try {
            await Photo.updateOne(
              { _id: pid },
              {
                favorite: false,
              },
            );
            return res.json({
              status: "SUCCESS",
              message: "Photo successfully removed to favorite",
            });
          } catch (error) {
            return res.status(400).json({
              status: "FAILED",
              message: "Photo not removed to favorite",
            });
          }
        } else {
          return res.status(400).json({
            status: "FAILED",
            message: "Photo not favorite",
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

const getMultipleByFav = (req, res) => {
  const id = req.user._id;
  const start = req.query.start;
  const limit = req.query.limit;
  console.log(req);
  try {
    Photo.find({ userId: id, favorite: true })
      .sort({ date: -1 })
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .then((data) => {
        data = data.map((itm) => {
          return itm._id;
        });
        if (data.length === 0) {
          return res.status(400).json({
            status: "FAILED",
            message: "There is no more favorite",
            data: data,
          });
        }
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

const updatePhoto = async (req, res) => {
  const uid = req.user._id;
  const description = req.body.description;
  const pid = req.body.photoId;
  if (!pid) {
    return res.status(400).json({
      status: "FAILED",
      message: "You must provide an id.",
    });
  }
  if (description == null) {
    return res.status(400).json({
      status: "FAILED",
      message: "You must provide a description",
    });
  }
  try {
    const photo = await Photo.findById(pid);
    if (photo.userId == uid) {
      await Photo.updateOne(
        { _id: pid },
        {
          description: description,
        },
      );
      return res.json({
        status: "SUCCESS",
        message: "Description successfully changed",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "FAILED",
      message: "Error" + error,
    });
  }
};

module.exports = {
  getMetaById,
  getOneById,
  getMultipleByUserId,
  getMultipleByAlbumId,
  getMultipleByFav,
  deletePhoto,
  addFav,
  removeFav,
  updatePhoto,
};
