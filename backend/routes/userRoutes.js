const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.createUser);
router.get("/:id", userController.getUserById);
router.post("/login", userController.login);

module.exports = router;
