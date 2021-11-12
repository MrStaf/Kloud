const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  fileName: String,
  favorite: Boolean,
  albums: Array,
  date: Date,
  description: String,
  userId: mongoose.ObjectId,
  photoId: mongoose.ObjectId,
  mimeType: String,
});

const Photo = mongoose.model("Photos", PhotoSchema);

module.exports = Photo;
