const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email Exist"],
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

/**
 * This is the middleware, It will be called before saving any record
 */
// UserSchema.pre("save", function (next) {
//   // check if password is present and is modified.
//   if (this.password && this.isModified("password")) {
//     // call your hashPassword method here which will return the hashed password.
//     this.password = hashPassword(this.password);
//   }
//   // everything is done, so let's call the next callback.
//   next();
// });

const User = mongoose.model("Users", userSchema);

module.exports = User;
