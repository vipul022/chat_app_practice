const express = require("express");
const router = express.Router();
const {
  registerNew,
  registerCreate,
} = require("../controllers/auth_controller");

router.get("/register", registerNew); //signup

router.post("/register", registerCreate);
module.exports = router;
