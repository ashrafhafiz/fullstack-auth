module.exports = {
  list: async (req, res) => {
    try {
      let users = await req.context.models.User.find().select(
        "name email updated created"
      );
      res.json(users);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },

  create: async (req, res) => {
    try {
      const existingUser = await req.context.models.User.findOne({
        email: req.body.email,
      });
      if (existingUser) {
        const { id, email } = existingUser;
        return res.status(400).send({
          message: "User Already Exists!",
          user: { id, email },
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    try {
      const newUser = await req.context.models.User.create({
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).json({
        message: "Successfully signed up!",
        newUser,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  findme: async (req, res) => {
    try {
      let me = await req.context.models.User.findByLogin(req.body.login);
      if (!me) {
        return res.status(404).json({
          message: "User not found!",
          user: req.body.login,
        });
      }
      return res.status(200).json({
        user: me,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  findit: async (req, res) => {
    try {
      let user = await req.context.models.User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
          user: req.params.id,
        });
      }
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  deleteit: async (req, res) => {
    try {
      let user = await req.context.models.User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
          user: req.params.id,
        });
      }
      await user.remove();
      return res.status(200).json({
        message: "User deleted successfully.",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  updateit: async (req, res) => {},
};
