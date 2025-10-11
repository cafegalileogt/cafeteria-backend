const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login-users", userController.loginUsers);
router.post("/logout-users", userController.logoutUsers);

module.exports = router;