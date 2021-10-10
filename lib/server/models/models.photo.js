const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  fileName: String,
  favorite: Boolean,
  albums: Array,
  date: Date,
  description: String,
  photoId: mongoose.ObjectId,
  userId: mongoose.ObjectId,
});

const Photo = mongoose.model("Photos", PhotoSchema);

module.exports = Photo;
