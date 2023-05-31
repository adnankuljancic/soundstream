const userService = require("../services/userService.js");

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const createdUser = await userService.createUser(username, email, password);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create User" });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
}

module.exports = {
  createUser,
  getUserById,
};
