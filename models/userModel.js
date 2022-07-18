const cuid = require("cuid");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: cuid },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email Exist"],
      validate: [isEmail, "invalid email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    email: login,
  });

  return user;
};

/**
 * This is the middleware, It will be called before saving any record
 */
userSchema.pre("save", function (next) {
  // check if password is present and is modified.
  if (this.password && this.isModified("password")) {
    // call your hashPassword method here which will return the hashed password.
    this.password = bcrypt.hashSync(this.password, 10);
  }
  // everything is done, so let's call the next callback.
  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
