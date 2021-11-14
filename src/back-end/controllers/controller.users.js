// Password handler
const bcrypt = require("bcrypt");

// JWT
const jwt = require("jsonwebtoken");

// token generator
const uuid = require("uuid").v4;

// Models
const User = require("../models/models.user");

// Schema validator
const schema = require("./../schema/schema.user");
const schemaNotReq = require("./../schema/schema.user.notReq");

const getUser = async (req, res) => {
  const uid = req.user._id;
  try {
    let user = await User.findOne({ _id: uid });
    console.log(user);
    user.password = null;
    return res.json({
      status: "SUCCESS",
      message: "User successfully found",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photoToken: user.photoToken,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "FAILED",
      message: "Err: " + error,
    });
  }
};

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
      password,
    });

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
                .catch(() => {
                  res.status(400).json({
                    status: "FAILED",
                    message: "An error occurred while saving user account",
                  });
                });
            })
            .catch(() => {
              res.status(400).json({
                status: "FAILED",
                message: "An error occurred while hashing the password",
              });
            });
        }
      })
      .catch(() => {
        res.status(400).json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.details
        .map((itm) => {
          return itm.message;
        })
        .join("\n"),
    });
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

const updateUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  firstName = firstName?.trim();
  lastName = lastName?.trim();
  email = email?.trim();
  password = password?.trim();
  const uid = req.user._id;
  try {
    // validate the fields
    const user = await schemaNotReq.validateAsync({
      firstName,
      lastName,
      email,
      password,
    });
    User.find({ email }).then((data) => {
      if (data.length > 0) {
        console.log("data", data)
        return res.json({
          status: "FAILED",
          message: "User with provided email already exist",
        });
      } else {
        User.findOne({ _id: uid })
          .then(async (response) => {
            if (response) {
              // The user exist
              if (response._id == uid) {
                // correct user
                if (password) {
                  // password handling
                  const saltRounds = 10;
                  bcrypt
                    .hash(password, saltRounds)
                    .then(async (hashedPassword) => {
                      try {
                        if (firstName) {
                          await User.updateOne(
                            { _id: uid },
                            {
                              firstName,
                            }
                          );
                        }
                        if (lastName) {
                          await User.updateOne(
                            { _id: uid },
                            {
                              lastName,
                            }
                          );
                        }
                        if (email) {
                          await User.updateOne(
                            { _id: uid },
                            {
                              email,
                            }
                          );
                        }
                        await User.updateOne(
                          { _id: uid },
                          {
                            password: hashedPassword,
                          }
                        );
                        User.findOne({_id: uid}).then((data) => {
                          console.log(data)
                          const token = jwt.sign(
                            { _id: uid },
                            process.env.TOKEN_SECRET
                          );
                          return res.json({
                            status: "SUCCESS",
                            message: "User successfully updated",
                            token: token,
                            data: data,
                          });
                        })
                      } catch (error) {
                        return res.status(400).json({
                          status: "FAILED",
                          message: "Err: " + error,
                        });
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                      res.status(400).json({
                        status: "FAILED",
                        message: "An error occurred while hashing the password",
                      });
                    });
                } else {
                  try {
                    if (firstName) {
                      await User.updateOne(
                        { _id: uid },
                        {
                          firstName,
                        }
                      );
                    }
                    if (lastName) {
                      await User.updateOne(
                        { _id: uid },
                        {
                          lastName,
                        }
                      );
                    }
                    if (email) {
                      await User.updateOne(
                        { _id: uid },
                        {
                          email,
                        }
                      );
                    }
                    User.findOne({_id: uid}).then((data) => {
                      console.log(data)
                      const token = jwt.sign(
                        { _id: uid },
                        process.env.TOKEN_SECRET
                      );
                      return res.json({
                        status: "SUCCESS",
                        message: "User successfully updated",
                        token: token,
                        data: data,
                      });
                    })
                  } catch (error) {
                    return res.status(400).json({
                      status: "FAILED",
                      message: "Err: " + error,
                    });
                  }
                }
              } else {
                return res.status(400).json({
                  status: "FAILED",
                  message: "Access denied",
                });
              }
            } else {
              res.json({
                status: "FAILED",
                message: "User with the provided token does not exists",
              });
            }
          })
          .catch((err) => {
            return res.status(400).json({
              status: "FAILED",
              message: "Error while finding user",
            });
          });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.details
        .map((itm) => {
          return itm.message;
        })
        .join("\n"),
    });
  }

};

const deleteUser = (req, res) => {
  const id = req.user._id;
  User.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        // User doesn't exist
        return res.json({
          status: "SUCCESS",
          message: "User already deleted.",
        });
      }
      // User exist and was deleted
      return res.json({
        status: "SUCCESS",
        message: "User successfully deleted.",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "FAILED",
        message: `Error while deleting user: ${err}`,
      });
    });
};

module.exports = {
  signUp,
  signIn,
  deleteUser,
  updateUser,
  getUser,
};
