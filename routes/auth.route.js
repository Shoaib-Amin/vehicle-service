const express = require("express");
const { login, create } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", login)
router.post("/signup", create)

module.exports = router;