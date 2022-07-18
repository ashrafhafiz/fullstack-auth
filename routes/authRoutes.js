const router = require("express").Router();
const { auth } = require("../utils");
const { login, authAccess, freeAccess } = require("../controllers");

router.post("/login", login);

// authentication endpoint
router.get("/auth-endpoint", auth, authAccess);

// free endpoint
router.get("/free-endpoint", freeAccess);

module.exports = router;
