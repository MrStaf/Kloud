// dotenv
require('dotenv').config();

// Mongodb
require("./config/db");

const app = require('express')();
const port = 3000;

// Import routes
const UserRouter = require('./api/user');
const PostsRouter = require('./api/posts');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use("/api/user", UserRouter);
app.use("/api/posts", PostsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})