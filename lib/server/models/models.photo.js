const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  favorite: Boolean,
  albums: Array,
  date: Date,
  description: String,
  photoId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
});

const Photo = mongoose.model("Photos", PhotoSchema);

module.exports = Photo;
