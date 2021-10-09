// dotenv
require('dotenv').config();

// Mongodb
require("./config/config.db");

const app = require('express')();
const port = 3000;

// Import routes
const UserRouter = require('./api/router.user');
const PostsRouter = require('./api/router.posts');
const UploadRouter = require('./api/router.upload');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

// Routes set to the app
app.use("/api/user", UserRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/photos", UploadRouter);

// Starting the app
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})