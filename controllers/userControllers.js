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

  list: async (req, res) => {
    try {
      let users = await User.find().select("name email updated created");
      res.json(users);
    } catch (error) {
      return res.status(400).json({
        error,
      });
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

  create: async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({
          message: "User Already Exists!",
          existingUser,
        });
      }
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }

    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // const newUser = new User({
    //   email: req.body.email,
    //   password: hashedPassword,
    // });

    try {
      const newUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      return res.status(200).json({
        message: "Successfully signed up!",
        newUser,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },
};
