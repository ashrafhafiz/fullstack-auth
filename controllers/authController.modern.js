const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      let user = await req.context.models.User.findByLogin(req.body.email);
      if (!user) {
        return res.status(404).json({
          message: "Incorrect email or password! (email)",
        });
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({
          message: "Incorrect email or password! (password)",
        });
      }
      //   create JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        message: "Login Successful",
        user,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  authAccess: (req, res) => {
    res.json({ message: "You are authorized to access me" });
  },

  freeAccess: (req, res) => {
    res.json({ message: "You are free to access me" });
  },
};
