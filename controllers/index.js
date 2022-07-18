const {
  list,
  create,
  findme,
  findit,
  updateit,
  deleteit,
} = require("./userControllers.modern");
const { login, authAccess, freeAccess } = require("./authController.modern");
const { getAllUsers, createUser } = require("./userControllers");
module.exports = {
  list,
  create,
  findme,
  findit,
  updateit,
  deleteit,
  login,
  authAccess,
  freeAccess,
  getAllUsers,
  createUser,
};
