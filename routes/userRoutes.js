const router = require("express").Router();

const {
  list,
  create,
  // getStudentById,
  // updateStudent,
  // deleteStudent,
} = require("../controllers/userControllers");

// const studentValidator = require("../middlewares/StudentValidatorMiddleware.js");

router.get("/", list);

router.post("/", create);

// router.put("/:id", updateStudent);
// router.delete("/:id", deleteStudent);

module.exports = router;
