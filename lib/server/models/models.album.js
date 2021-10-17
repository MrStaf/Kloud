const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: String,
  userId: mongoose.ObjectId,
  date: Date,
});

const Album = mongoose.model("Albums", albumSchema);

module.exports = Album;
