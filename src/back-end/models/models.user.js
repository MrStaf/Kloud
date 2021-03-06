const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    photoToken: String,
})

const User = mongoose.model("User", UserSchema);

module.exports = User;