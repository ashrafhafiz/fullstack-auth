const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection;

const User = require("../models/userModel");

const hashedPassword = bcrypt.hashSync("secret", 10);

const contacts = [
  {
    email: "jon@jonwexler.com",
    password: hashedPassword,
  },
  {
    email: "eggplant@recipeapp.com",
    password: hashedPassword,
  },
  {
    email: "souffle@recipeapp.com",
    password: hashedPassword,
  },
];

User.deleteMany({}, () => {
  console.log("Users data is empty!");
});
//   .exec()
//   .then(() => {
//     console.log("Users data is empty!");
//   });

let commands = [];

contacts.forEach((contact) => {
  let newUser = new User({
    email: contact.email,
    password: contact.password,
  });
  newUser
    .save()
    .then((savedDocument) => {
      console.log(savedDocument);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Promise.all(commands)
//   .then((result) => {
//     console.log(JSON.stringify(result));
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.log(error);
//   });
