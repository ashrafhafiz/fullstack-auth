const bcrypt = require("bcrypt");
const User = require("../models/userModel");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find({});
    if (!users) {
      res.status(404).send({
        message: "No users found.",
      });
    } else {
      res.status(200).send({ users });
    }
  },

  createUser: (req, res) => {
    // res.send("New User Signup Route!");
    User.findOne({ email: req.body.email }, (error, user) => {
      if (user) {
        return res.status(400).send({
          message: "User Already Exists!",
          user,
        });
      }

      bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
          });

          newUser
            .save()
            .then((result) => {
              res.status(201).send({
                message: "User Signup Successfully!",
                result,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Error creating user.",
                error,
              });
            });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Password was not hashed successfully.",
            error,
          });
        });
    });
  },
};
