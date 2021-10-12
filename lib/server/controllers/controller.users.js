// Password handler
const bcrypt = require("bcrypt");

// JWT
const jwt = require("jsonwebtoken");

// token generator
const uuid = require("uuid").v4;

// Models
const User = require("../models/models.user");

// Schema validator
const schema = require('./../schema/schema.user');

// sign up
const signUp = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  firstName = firstName?.trim();
  lastName = lastName?.trim();
  email = email?.trim();
  password = password?.trim();
  try {
    // validate the fields
    const user = await schema.validateAsync({
      firstName,
      lastName,
      email,
      password
    })

    // Checking if user already exists
    User.find({ email })
      .then((response) => {
        if (response.length) {
          // A user already exist
          res.json({
            status: "FAILED",
            message: "User with the provided email already exists",
          });
        } else {
          // Try create a new user

          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                photoToken: uuid(),
              });
              newUser
                .save()
                .then((response) => {
                  res.status(201).json({
                    status: "SUCCESS",
                    message: "Signup successful",
                    data: response,
                  });
                })
                .catch((err) => {
                  console.error(err);
                  res.status(400).json({
                    status: "FAILED",
                    message: "An error occurred while saving user account",
                  });
                });
            })
            .catch((err) => {
              console.error(err);
              res.status(400).json({
                status: "FAILED",
                message: "An error occurred while hashing the password",
              });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "FAILED",
      message: error.details.map((itm) => {
        return itm.message
      }).join("\n"),
    })
  }
};

// sign i
const signIn = (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email === "" || password === "") {
    res.status(400).json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data) {
          // User Exist
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match

                // Create and assign token
                const token = jwt.sign(
                  { _id: data[0]._id },
                  process.env.TOKEN_SECRET
                );
                res.header("auth-token", token);
                res.json({
                  status: "SUCCESS",
                  message: "Sign in successful",
                  token: token,
                  data: data,
                });
              } else {
                res.status(400).json({
                  status: "FAILED",
                  message: "Invalid password entered",
                });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(400).json({
                status: "FAILED",
                message: "An error occurred while comparing password",
              });
            });
        } else {
          res.status(400).json({
            status: "FAILED",
            message: "Invalid credentials entered",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAILED",
          message: "User doesn't exist",
        });
      });
  }
};

module.exports = {
  signUp,
  signIn,
};
