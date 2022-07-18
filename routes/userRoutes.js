const router = require("express").Router();

const {
  list,
  create,
  findme,
  findit,
  updateit,
  deleteit,
  getAllUsers,
  createUser,
} = require("../controllers");

// const studentValidator = require("../middlewares/StudentValidatorMiddleware.js");

router.get("/", list);
router.post("/", create);

router.get("/me", findme);

router.get("/:id", findit);
router.put("/:id", updateit);
router.delete("/:id", deleteit);

// router.put("/:id", updateStudent);

module.exports = router;
