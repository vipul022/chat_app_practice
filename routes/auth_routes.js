const express = require("express");
const router = express.Router();
const {
  registerNew,
  registerCreate,
  loginNew,
  logOut,
  loginCreate,
} = require("../controllers/auth_controller");

const { authRedirect, authorise } = require("../middleware/auth_middleware");

router.get("/register", authRedirect, registerNew); //signup

router.post("/register", registerCreate);
router.get("/logout", logOut);

router.get("/login", authRedirect, loginNew);
router.post("/login", loginCreate);
module.exports = router;
